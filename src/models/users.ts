export enum USER_TYPE {
    ADMIN = 'admin',
    EMPLOYEE = 'employee',
    POWERUSER = 'poweruser'
}

export interface admin {
    id: string,
    name: string,
    age: number,
    type: USER_TYPE,
    role: string
}
export interface employee {
    id: string,
    name: string,
    age: number,
    type: USER_TYPE,
    occupation: string
}
export interface poweruser {
    id: string,
    name: string,
    age: number,
    type: USER_TYPE,
    role: string,
    occupation: string
}

export type user = admin | employee | poweruser;

class BaseUser {
    id: string;
    constructor(public name: string, public age: number, public type: USER_TYPE) {
        this.id = Math.random().toString(36).slice(2, 7)
    }
}

export class Admin extends BaseUser {
    constructor(name: string, age: number, type: USER_TYPE, public role: string) {
        super(name, age, type);
    }
}
export class Employee extends BaseUser {
    constructor(name: string, age: number, type: USER_TYPE, public occupation: string) {
        super(name, age, type);
    }
}
export class PowerUser extends BaseUser {
    constructor(name: string, age: number, type: USER_TYPE, public role: string, public occupation: string) {
        super(name, age, type);
    }
}

export type User = Admin | Employee | PowerUser;