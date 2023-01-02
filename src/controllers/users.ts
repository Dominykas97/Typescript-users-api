import { RequestHandler } from "express";
import { Admin, Employee, PowerUser, User, USER_TYPE } from '../models/users';
import { db } from "../db";
import { ResultSetHeader } from "mysql2";

export const createUser: RequestHandler = (req: { body: User }, res, next) => {
    const name = req.body.name;
    const age = req.body.age;
    const type = req.body.type;
    let role, occupation;
    if (!(name && age && type)) {
        return res.status(400).json({ err: 'Could not create a new user: name, age, and/or type missing' });
    }
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
    else if (type === USER_TYPE.ADMIN) {
        role = (req.body as Admin).role;
        if (!role) {
            return res.status(400).json({ err: 'role is missing for admin' });
        }
    }
    else if (type === USER_TYPE.EMPLOYEE) {
        occupation = (req.body as Employee).occupation;
        if (!occupation) {
            return res.status(400).json({ err: 'occupation is missing for employee' });
        }
    }
    else if (type === USER_TYPE.POWERUSER) {
        role = (req.body as PowerUser).role;
        occupation = (req.body as PowerUser).occupation;
        if (!(role && occupation)) {
            return res.status(400).json({ err: 'role and/or occupation is missing for poweruser' }).end();
        }
    }
    const queryString = `INSERT INTO users VALUES (NULL, "${name}", ${age}, "${type}", ${role ?? null}, ${occupation ?? null})`;
    console.log(queryString)
    db.query(queryString, (err, result: ResultSetHeader) => {
        console.log(result);
        if (err) { return next({ err: err.message }); }
        if (result.affectedRows < 1) {
            return res.status(400).json({ err: 'Could not create a new user' });
        }
        return res.status(200).json({ message: `Created a new user with id: ${result.insertId}` });
    });
};

export const getUsers: RequestHandler = (req: { query: { age?: string, type?: string, role?: string, occupation?: string } }, res, next) => {
    console.log(req.query);
    let queryString = `SELECT * FROM users`;
    const optionalParameters: string[] = [];
    const age = parseInt(req.query.age as string);
    if (age) {
        optionalParameters.push(`age=${age}`);
    }
    const type = req.query.type;
    if (type) {
        optionalParameters.push(`type="${type}"`);
    }
    const role = req.query.role;
    if (role) {
        optionalParameters.push(`role=${role}`);
    }
    const occupation = req.query.occupation;
    if (occupation) {
        optionalParameters.push(`occupation=${occupation}`);
    }
    if (optionalParameters.length > 0) {
        queryString += ' WHERE ' + optionalParameters.join(' AND ');
    }
    console.log(queryString);
    db.query(queryString, (err, result: User[]) => {
        if (err) { return next({ err: err.message }); }
        if (result.length < 1) {
            return res.status(400).json({ err: `Could not find users` });
        }
        const cleanUsers = result.map(name => cleanUserFromNullValues(name));
        return res.status(200).json({ users: cleanUsers });
    });
};

export const getUser: RequestHandler<{ id: string }> = (req, res, next) => {
    const userId = req.params.id;
    const queryString = `SELECT * FROM users where id = ${userId}`;
    db.query(queryString, (err, result: User[]) => {
        if (err) { return next({ err: err.message }); }
        if (result.length < 1) {
            return res.status(400).json({ err: `Could not find user with id: ${userId}` });
        }
        const user = cleanUserFromNullValues(result[0]);
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

const cleanUserFromNullValues = (object: object) => JSON.parse(JSON.stringify(object, (_, value) => value ?? undefined));