# Typescript-users-api
| Endpoint  | Method | Parameters (all optional) | Description |
| ---------- | ------ |---------------------------|-------------|
| /users     | Get    | age: filters the list by those with a matching age<br />type: One of ‘admin’, ‘employee’ or ‘poweruser’. Filters Users to just that type<br />role: Filters the list by those with a matching role<br />occupation: Filters the list by those with a matching occupation<br />Note: Parameters can be used together e.g. /users?age=34&role=manager would return a list of all managers who were 34 | Returns a list of all Users (Admins, Employee & Power Users) |
| /users     | Post   | None | Adds a new User (of any given type) |
| /users/:id | Get    | None | Returns a User with matching unique identifier |
| /users/:id | Delete | None |Removes a User (of any type) |

To initialize database, in terminal run: `mysql -u root -p < db_init.sql`

To install, in terminal run: `npm install`

To compile TypeScript to JavaScript, in terminal run: `tsc`

To run the application, in terminal run: `npm run start`. The api will be accessible on `localhost:3000/users`