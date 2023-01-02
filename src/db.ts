import mysql from "mysql2";
import * as dotenv from "dotenv";
dotenv.config();

export const db = mysql.createConnection({
    // host: process.env.DB_HOST,
    user: process.env.DB_USER || "typescript_api_db_user",
    password: process.env.DB_PWD || "supersecretpassword",
    database: process.env.DB_NAME || "typescript_users_api",
    socketPath: '/tmp/mysql.sock'
});

