import Boom from '@hapi/boom';
import { injectable } from 'inversify';
import { UserModel, UserDTO } from '../model';
import { UserRepository } from '../interfaces';
import { UserUpdateType } from '../types';
import { handleDaoError, logger } from '../../../utils';

@injectable()
export class UserRepositoryImplDb implements UserRepository {
    public select(options: Record<string, unknown>): Promise<UserModel[]> {
        return UserModel.findAll(options);
    }

    public getById(id: string): Promise<UserModel> {
        return UserModel.findByPk(id).then(handleDaoError('User not found'));
    }

    public async create(dto: UserDTO): Promise<UserModel> {
        const [user, created]: [UserModel, boolean] = await UserModel.findOrCreate({
            where: { login: dto.login },
            defaults: dto
        });

        if (!created) {
            const err = Boom.conflict('This login already in use');

            logger.error(err);
            throw err;
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
