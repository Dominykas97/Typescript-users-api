export class User {
    id: string;
    constructor(public name: string, public age: number, public role: string) {
        this.id = Math.random().toString(36).slice(2, 7)
    }
}