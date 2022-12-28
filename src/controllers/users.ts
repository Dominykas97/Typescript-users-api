import { RequestHandler } from "express";
import { Admin, Employee, PowerUser, User, USER_TYPE } from '../models/users';
const USERS: User[] = [];


export const createUser: RequestHandler = (req: { body: User }, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const type = req.body.type;
    let newUser: User | undefined;
    if (name && age && type) {
        if (typeof (name) !== "string") {
            throw new Error(`name is not a string`);
        }
        if (typeof (age) !== "number") {
            throw new Error(`age is not a number`);
        }
        if (!Object.values(USER_TYPE).includes(type as USER_TYPE)) {
            throw new Error(`type is invalid`);
        }
        if (type === USER_TYPE.ADMIN) {
            const role = (req.body as Admin).role;
            if (role) {
                newUser = new Admin(name, age, type, role);
            } else {
                throw new Error(`role is missing for admin`);
            }
        }
        if (type === USER_TYPE.EMPLOYEE) {
            const occupation = (req.body as Employee).occupation;
            if (occupation) {
                newUser = new Admin(name, age, type, occupation);
            } else {
                throw new Error(`occupation is missing for employee`);
            }
        }
        if (type === USER_TYPE.POWERUSER) {
            const role = (req.body as PowerUser).role;
            const occupation = (req.body as PowerUser).occupation;
            if (role && occupation) {
                newUser = new PowerUser(name, age, type, role, occupation);
            } else {
                throw new Error(`role and/or occupation is missing for poweruser`);
            }
        }

        if (newUser) {
            USERS.push(newUser);
            res.status(200).json({ message: 'Created a new user', createdUser: newUser });
        } else {
            throw new Error(`Could not create a new user`)
        }
    } else {
        throw new Error(`Could not create a new user: name, age, and/or type missing`)
    }
};


export const getUsers: RequestHandler<{ age: number, type: string, role: string, occupation: string }> = (req, res) => {
    let filteredUsers = USERS;
    console.log(req.query)
    const age = req.query.age;
    if (age) {
        filteredUsers = filteredUsers.filter(user => user.age === +age)
    }
    const type = req.query.type;
    if (type) {
        filteredUsers = filteredUsers.filter(user => user.type === type)
    }
    const role = req.query.role;
    if (role) {
        filteredUsers = filteredUsers.filter(user =>
            (user.type === USER_TYPE.ADMIN && (user as Admin).role === role) ||
            (user.type === USER_TYPE.POWERUSER && (user as PowerUser).role === role)
        )
    }
    const occupation = req.query.occupation;
    if (occupation) {
        filteredUsers = filteredUsers.filter(user =>
            (user.type === USER_TYPE.EMPLOYEE && (user as Employee).occupation === occupation) ||
            (user.type === USER_TYPE.POWERUSER && (user as PowerUser).occupation === occupation)
        )
    }
    res.status(200).json({ users: filteredUsers });
};

export const getUser: RequestHandler<{ id: string }> = (req, res) => {
    const userId = req.params.id;
    const userIndex = USERS.findIndex(user => user.id === userId)
    if (userIndex < 0) {
        throw new Error(`Could not find user with id: ${userId}`)
    }
    res.status(200).json({ user: USERS[userIndex] });
};

export const deleteUser: RequestHandler<{ id: string }> = (req, res) => {
    const userId = req.params.id;
    const userIndex = USERS.findIndex(user => user.id === userId)
    if (userIndex < 0) {
        throw new Error(`Could not find user with id: ${userId}`)
    }
    USERS.splice(userIndex, 1)
    res.status(200).json({ message: "User deleted" });
}; 