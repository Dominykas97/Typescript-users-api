import { RequestHandler } from "express";
import { User, USER_TYPE } from '../models/users';
const USERS: User[] = [];

export const createUser: RequestHandler = (req: { body: User }, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const type = req.body.type;
    if (name && age && type) {
        if (typeof (name) !== "string") {
            throw new Error(`Name is not a string`);
        }
        if (typeof (age) !== "number") {
            throw new Error(`Age is not a number`);
        }
        if (!Object.values(USER_TYPE).includes(type as USER_TYPE)) {
            throw new Error(`Type is invalid`);
        }
        const newUser = new User(name, age, type);
        USERS.push(newUser);
        res.status(200).json({ message: 'Created a new user', createdUser: newUser });
    } else {
        throw new Error(`Could not create a new user`)
    }
};

export const getUsers: RequestHandler = (req, res) => {
    res.status(200).json({ users: USERS });
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