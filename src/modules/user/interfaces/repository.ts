import { UserDTO, UserModel } from '../model';
import { UserUpdateType } from '../types';

export interface UserRepository {
    login(login: string, password: string): Promise<UserModel>;

    select(options: Record<string, unknown>): Promise<UserModel[]>;

    getById(id: string): Promise<UserModel>;

    create(dto: UserDTO): Promise<UserModel>;

    update(id: string, data: UserUpdateType): Promise<UserModel>;

    delete(id: string): Promise<UserModel>;
}
