import Boom from '@hapi/boom';
import { injectable } from 'inversify';
import { UserDTO, UserModel } from '../model';
import { UserRepository } from '../interfaces';
import { UserUpdateType } from '../types';
import { handleDaoError } from '../../../utils';

@injectable()
export class UserRepositoryImplDb implements UserRepository {
    public login(login: string, password: string): Promise<UserModel> {
        return UserModel.findOne({ where: { login, password } }).then(
            handleDaoError(`login(${login}, password(${password}) - User not found`)
        );
    }

    public select(options: Record<string, unknown>): Promise<UserModel[]> {
        return UserModel.findAll(options);
    }

    public getById(id: string): Promise<UserModel> {
        return UserModel.findByPk(id).then(handleDaoError(`getById(${id}) - User not found`));
    }

    public async create(dto: UserDTO): Promise<UserModel> {
        const [user, created]: [UserModel, boolean] = await UserModel.findOrCreate({
            where: { login: dto.login },
            defaults: dto
        });

        if (!created) {
            throw Boom.conflict(`create(${dto}) - This login already in use`);
        }

        return user;
    }

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

    public delete(id: string): Promise<UserModel> {
        return UserModel.destroy({ where: { id } }).then(handleDaoError(`delete(${id}) - User not found`));
    }
}
