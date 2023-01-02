CREATE DATABASE IF NOT EXISTS typescript_users_api;
USE typescript_users_api;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    type ENUM('admin', 'employee', 'poweruser') NOT NULL,
    role VARCHAR(255),
    occupation VARCHAR(255)
);

INSERT INTO users VALUES (1, "user_1", 18, "admin", "manager", NULL);
INSERT INTO users VALUES (2, "user_2", 19, "employee", NULL, "data analyst");
INSERT INTO users VALUES (3, "user_3", 18, "poweruser", "manager", "software engineer");
INSERT INTO users VALUES (4, "user_4", 20, "admin", "manager", NULL);

CREATE USER IF NOT EXISTS 'typescript_api_db_user'@'localhost' IDENTIFIED BY 'supersecretpassword';
GRANT INSERT, DELETE, SELECT on typescript_users_api.users TO 'typescript_api_db_user'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;