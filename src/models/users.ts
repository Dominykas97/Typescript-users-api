export class User {
    id: string;
    constructor(public name: string, public age: number, public type: USER_TYPE) {
        this.id = Math.random().toString(36).slice(2, 7)
    }
}

export enum USER_TYPE {
    ADMIN = 'admin',
    EMPLOYEE = 'employee',
    POWERUSER = 'poweruser'
}