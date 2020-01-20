import {omit} from 'lodash';
import {shortenArray} from '../../../utils';
import {User} from "../model";
import {throws} from "assert";

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

    // userModel
    constructor(users: Array<User>) {
        this.users = users;
    }

    public getAll = async (loginSubstring: string = '', limit?: number): Promise<Array<User>> => {
        const allUsers = this.users.filter(({isDeleted}: any) => !isDeleted);

        const filteredUsers = loginSubstring
            ? allUsers.filter(
                ({login}: User) => login.toLowerCase().indexOf(loginSubstring.toLowerCase()) !== -1
            )
            : allUsers;

        return Promise.resolve(shortenArray(filteredUsers, limit));
    };

    public getById = async (id: string): Promise<User> => {
        const user = this.users.find((user: User) => user.id === id);
        if (!user) return Promise.reject('User not found');
        return Promise.resolve(user);
    };

    // TODO: question
    public create = async ({login, password, age}: Body): Promise<any> => {
        try {
            if (!login || !password) {
                throw new Error('Missing required parameters');
            }

            return await User.create({login, password, age});
        } catch (e) {
            console.error(e)
        }
    };

    public update = async (id: string, body: Body): Promise<User> => {
        const user = this.users.find((user: User) => user.id === id);

        if (!user) return Promise.reject('User not found');

        const {login, password, age} = body;

        if (login) user.login = login;
        if (password) user.password = password;
        if (age) user.age = age;

        return Promise.resolve(user);
    };

    public delete = async (id: string): Promise<User> => {
        const user = this.users.find((user: User) => user.id === id);

        if (!user) return Promise.reject('User not found');

        user.isDeleted = true;

        return Promise.resolve(user);
    };
}
