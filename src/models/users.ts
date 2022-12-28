export enum USER_TYPE {
    ADMIN = 'admin',
    EMPLOYEE = 'employee',
    POWERUSER = 'poweruser'
}

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