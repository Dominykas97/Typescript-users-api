import { RequestHandler } from "express";
import { Admin, Employee, PowerUser, User, USER_TYPE } from '../models/users';
import { db } from "../db";
import { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";
const USERS: User[] = [];


export const createUser: RequestHandler = (req: { body: User }, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const type = req.body.type;
    let newUser: User | undefined;
    if (name && age && type) {
        if (typeof (name) !== "string") {
            return res.status(400).json({ err: 'name is not a string' });
        }
        if (typeof (age) !== "number") {
            return res.status(400).json({ err: 'age is not a number' });
        }
        if (!Object.values(USER_TYPE).includes(type as USER_TYPE)) {
            const availableTypesNoQuotes = JSON.parse(JSON.stringify(Object.values(USER_TYPE)).replace(/&quot;/g, '"'));
            return res.status(400).json({ err: `type is invalid. Available types: ${availableTypesNoQuotes}` });
        }
        if (type === USER_TYPE.ADMIN) {
            const role = (req.body as Admin).role;
            if (role) {
                newUser = new Admin(name, age, type, role);
            } else {
                return res.status(400).json({ err: 'role is missing for admin' });
            }
        }
        if (type === USER_TYPE.EMPLOYEE) {
            const occupation = (req.body as Employee).occupation;
            if (occupation) {
                newUser = new Admin(name, age, type, occupation);
            } else {
                return res.status(400).json({ err: 'occupation is missing for employee' });
            }
        }
        if (type === USER_TYPE.POWERUSER) {
            const role = (req.body as PowerUser).role;
            const occupation = (req.body as PowerUser).occupation;
            if (role && occupation) {
                newUser = new PowerUser(name, age, type, role, occupation);
            } else {
                return res.status(400).json({ err: 'role and/or occupation is missing for poweruser' }).end();
            }
        }

        if (newUser) {
            USERS.push(newUser);
            return res.status(200).json({ message: 'Created a new user', createdUser: newUser });
        } else {
            return res.status(500).json({ err: 'Could not create a new user' });
        }
    } else {
        return res.status(400).json({ err: 'Could not create a new user: name, age, and/or type missing' });
    }
};


export const getUsers: RequestHandler = (req: { query: { age?: string, type?: string, role?: string, occupation?: string } }, res) => {
    let filteredUsers = USERS;
    console.log(req.query);
    const age = parseInt(req.query.age as string);
    if (age) {
        filteredUsers = filteredUsers.filter(user => user.age === age)
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
    return res.status(200).json({ users: filteredUsers });
};

export const getUser: RequestHandler<{ id: string }> = (req, res, next) => {
    const userId = req.params.id;
    const queryString = `SELECT * FROM users where id = ${userId}`;
    db.query(queryString, (err, result: User[]) => {
        if (err) { return next({ err: err.message }); }
        if (result.length < 1) {
            return res.status(400).json({ err: `Could not find user with id: ${userId}` });
        }
        const user = result[0];
        return res.status(200).json({ user: user });
    });

};

export const deleteUser: RequestHandler<{ id: string }> = (req, res, next) => {
    const userId = req.params.id;
    const queryString = `DELETE FROM users where id = ${userId}`;
    db.query(queryString, (err, result: ResultSetHeader) => {
        if (err) { return next({ err: err.message }); }
        if (result.affectedRows < 1) {
            return res.status(400).json({ err: `Could not find user with id: ${userId}` });
        }
        return res.status(200).json({ message: "User deleted" });
    });

}; 