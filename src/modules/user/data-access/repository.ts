import Boom from '@hapi/boom';
import { injectable } from 'inversify';
import { UserDTO, UserModel } from '../model';
import { UserRepository } from '../interfaces';
import { UserUpdateType } from '../types';
import { handleDaoError } from '../../../utils';
import { ErrorMessages } from '../constants';

@injectable()
export class UserRepositoryImplDb implements UserRepository {
    public login(login: string, password: string): Promise<UserModel> {
        return UserModel.findOne({ where: { login, password } }).then(
            handleDaoError(ErrorMessages.login(login, password))
        );
    }

    public select(options: Record<string, unknown>): Promise<UserModel[]> {
        return UserModel.findAll(options);
    }

    public getById(id: string): Promise<UserModel> {
        return UserModel.findByPk(id).then(handleDaoError(ErrorMessages.getById(id)));
    }

    public async create(dto: UserDTO): Promise<UserModel> {
        const [user, created]: [UserModel, boolean] = await UserModel.findOrCreate({
            where: { login: dto.login },
            defaults: dto
        });

        if (!created) {
            throw Boom.conflict(ErrorMessages.create(dto));
        }

        return user;
    }

    public update(id: string, data: UserUpdateType): Promise<UserModel> {
        const { password, age } = data;

        return UserModel.findByPk(id)
            .then(handleDaoError(ErrorMessages.update(id, data)))
            .then((instance: UserModel) => {
                instance.password = password || instance.password;
                instance.age = age || instance.age;
                instance.save();
                return instance;
            });
    }

    public delete(id: string): Promise<UserModel> {
        return UserModel.destroy({ where: { id } }).then(handleDaoError(ErrorMessages.delete(id)));
    }
}
