import Boom from '@hapi/boom';
import { injectable } from 'inversify';
import { UserModel, UserDTO } from '../model';
import { UserRepository } from '../interfaces';
import { UserUpdateType } from '../types';
import { handleDaoError, logger, trackExecutionTime } from '../../../utils';

@injectable()
export class UserRepositoryImplDb implements UserRepository {
    @trackExecutionTime
    public select(options: Record<string, unknown>): Promise<UserModel[]> {
        return UserModel.findAll(options);
    }

    @trackExecutionTime
    public getById(id: string): Promise<UserModel> {
        return UserModel.findByPk(id).then(handleDaoError(`getById(${id}) - User not found`));
    }

    @trackExecutionTime
    public async create(dto: UserDTO): Promise<UserModel> {
        const [user, created]: [UserModel, boolean] = await UserModel.findOrCreate({
            where: { login: dto.login },
            defaults: dto
        });

        if (!created) {
            const err = Boom.conflict(`create(${dto}) - This login already in use`);

            logger.error(err);
            throw err;
        }

        return user;
    }

    @trackExecutionTime
    public update(id: string, data: UserUpdateType): Promise<UserModel> {
        const { password, age } = data;

        return UserModel.findByPk(id)
            .then(handleDaoError(`update(${id}, ${data}) - User not found`))
            .then((instance: UserModel) => {
                instance.password = password || instance.password;
                instance.age = age || instance.age;
                instance.save();
                return instance;
            });
    }

    @trackExecutionTime
    public delete(id: string): Promise<UserModel> {
        return UserModel.destroy({ where: { id } }).then(handleDaoError(`delete(${id}) - User not found`));
    }
}
