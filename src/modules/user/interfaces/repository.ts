import { UserDTO, UserModel } from '../model';
import { UserUpdateType } from '../types';

export interface UserRepository {
    select(options: Object): Promise<UserModel[]>;

    getById(id: string): Promise<UserModel>;

    create(dto: UserDTO): Promise<UserModel>;

    update(id: string, body: UserUpdateType): Promise<UserModel>;

    delete(id: string): Promise<UserModel>;
}
