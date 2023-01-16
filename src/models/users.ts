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
