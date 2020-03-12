import { UserDTO } from '../model';
import { UserUpdateType } from '../types';

export const ErrorMessages = {
    login: (login: string, password: string) => `login(${login}, ${password} - Login or password incorrect`,
    getById: (id: string) => `getById(${id}) - User not found`,
    create: (dto: UserDTO) => `create(${dto}) - This login already in use`,
    update: (id: string, data: UserUpdateType) => `update(${id}, ${data}) - User not found`,
    delete: (id: string) => `delete(${id}) - User not found`
};
