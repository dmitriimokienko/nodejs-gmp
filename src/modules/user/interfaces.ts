import {UserType} from "./types";

export interface IUserService {
    select(loginSubstring: string, limit?: number): Promise<Array<UserType>>

    getById(id: string): Promise<UserType>,

    create(body: any): Promise<UserType>,

    update(id: string, body: any): Promise<UserType>,

    delete(id: string): Promise<UserType>
}
