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