import { RequestHandler } from "express";
import { User } from '../models/users';
const USERS: User[] = [];

export const createUser: RequestHandler = (req: { body: { id: string, name: string, role: string } }, res, next) => {
    const id = req.body.id;
    const name = req.body.name;
    const role = req.body.role;
    const newUser = new User(id, name, role);
    USERS.push(newUser);
    res.status(200).json({ message: 'Created a new user', createdUser: newUser });
};

export const getUsers: RequestHandler = (req, res, next) => {
    res.status(200).json({ users: USERS });
};

export const getUser: RequestHandler<{ id: string }> = (req, res, next) => {
    const userId = req.params.id;
    const userIndex = USERS.findIndex(user => user.id === userId)
    if (userIndex < 0) {
        throw new Error(`Could not find user with id: ${userId}`)
    }
    res.status(200).json({ user: USERS[userIndex] });
};

export const deleteUser: RequestHandler<{ id: string }> = (req, res, next) => {
    const userId = req.params.id;
    const userIndex = USERS.findIndex(user => user.id === userId)
    if (userIndex < 0) {
        throw new Error(`Could not find user with id: ${userId}`)
    }
    USERS.splice(userIndex, 1)
    res.status(200).json({ message: "User deleted" });
}; 