import {UserDTO} from './dto';
import {shortenArray} from '../../utils';

export type User = {
    id: string,
    login: string,
    password: string,
    age: number,
    isDeleted: boolean
}

type Body = {
    login: string,
    password: string,
    age: number
}

export interface IUserService {
    getAll(loginSubstring: string, limit?: number): Promise<Array<User>>

    getById(id: string): Promise<User>,

    create(body: any): Promise<User>,

    update(id: string, body: any): Promise<User>,

    delete(id: string): Promise<User>
}

export class UserService implements IUserService {
    private readonly users: Array<User>;

    constructor(users: Array<User>) {
        this.users = users;
    }

    public async getAll(loginSubstring: string = '', limit?: number): Promise<Array<User>> {
        const allUsers = this.users.filter(({isDeleted}: any) => !isDeleted);

        const filteredUsers = loginSubstring
            ? allUsers.filter(
                ({login}: User) => login.toLowerCase().indexOf(loginSubstring.toLowerCase()) !== -1
            )
            : allUsers;

        return Promise.resolve(shortenArray(filteredUsers, limit));
    }

    public async getById(id: string): Promise<User> {
        const user = this.users.find((user: User) => user.id === id);

        if (!user) return Promise.reject('User not found');
        return Promise.resolve(user);
    }

    public async create(body: Body): Promise<User> {
        const {login, password, age} = body;

        if (!login || !password) return Promise.reject('Missing required parameters');

        const user: User = new UserDTO(login, password, age);
        this.users.push(user);

        return Promise.resolve(user);
    }

    public async update(id: string, body: Body): Promise<User> {
        const user = this.users.find((user: User) => user.id === id);

        if (!user) return Promise.reject('User not found');

        const {login, password, age} = body;

        if (login) user.login = login;
        if (password) user.password = password;
        if (age) user.age = age;

        return Promise.resolve(user);
    }

    public async delete(id: string): Promise<User> {
        const user = this.users.find((user: User) => user.id === id);

        if (!user) return Promise.reject('User not found');

        user.isDeleted = true;

        return Promise.resolve(user);
    }
}
