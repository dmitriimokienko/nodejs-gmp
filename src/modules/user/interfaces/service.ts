import { UserDTO, UserModel } from '../model';
import {UserUpdateType} from "../types";

export interface UserService {
    select(loginSubstring: string, count?: string): Promise<UserModel[]>;

    getById(id: string): Promise<UserModel>;

    create(body: UserDTO): Promise<UserModel>;

    update(id: string, body: UserUpdateType): Promise<UserModel>;

    delete(id: string): Promise<UserModel>;
}
