"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.createUser = void 0;
const users_1 = require("../models/users");
const USERS = [];
const createUser = (req, res, next) => {
    const id = req.body.id;
    const name = req.body.name;
    const role = req.body.role;
    const newUser = new users_1.User(id, name, role);
    USERS.push(newUser);
    res.status(200).json({ message: 'Created a new user', createdUser: newUser });
};
exports.createUser = createUser;
const getUsers = (req, res, next) => {
    res.status(200).json({ users: USERS });
};
exports.getUsers = getUsers;
