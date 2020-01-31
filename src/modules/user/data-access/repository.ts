import { injectable } from 'inversify';
import 'reflect-metadata';
import Boom from '@hapi/boom';
import { UserModel, UserDTO } from '../model';
import { UserRepository } from '../interfaces';
import {UserUpdateType} from "../types";
import { handleDaoError } from '../../../utils';

@injectable()
export class UserRepositoryImplPostgres implements UserRepository {
    public select(options: Object): Promise<UserModel[]> {
        return UserModel.findAll(options);
    }

    public getById(id: string): Promise<UserModel> {
        return UserModel.findByPk(id).then(handleDaoError('User not found'));
    }

    public async create({ login, password, age }: UserDTO): Promise<UserModel> {
        const dto: UserDTO = new UserDTO(login, password, age);

        const [user, created]: [UserModel, boolean] = await UserModel.findOrCreate({
            where: { login },
            defaults: dto
        });

        if (!created) {
            throw Boom.badRequest('This login already in use');
        }

        return user;
    }

    public update(id: string, { password, age }: UserUpdateType): Promise<UserModel> {
        return UserModel.findByPk(id)
            .then(handleDaoError('User not found'))
            .then((instance: UserModel) => {
                instance.password = password || instance.password;
                instance.age = age || instance.age;
                instance.save();
                return instance;
            });
    }

    public delete(id: string): Promise<UserModel> {
        return UserModel.destroy({ where: { id } }).then(handleDaoError('User not found'));
    }
}
