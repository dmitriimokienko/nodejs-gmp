import uuidv4 from 'uuid/v4';

export class UserDTO {
    public readonly id?: string;
    public login: string;
    public password: string;
    public age?: number | null;
    public isDeleted: boolean;

    constructor(login: string, password: string, age?: number | null) {
        this.id = uuidv4();
        this.login = login;
        this.password = password;
        this.age = age || null;
        this.isDeleted = false;
    }
}
