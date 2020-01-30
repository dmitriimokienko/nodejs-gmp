import Boom from '@hapi/boom';
import { UserService } from '../interfaces';
import { UserModelType } from '../types';
import { UserModel } from '../model';
import { handleDaoError } from '../../../utils';
import { UserDTO } from '../dto';
import { createSequelizeFindOptions } from '../../../utils/create-sequelize-find-options';

export class UserServiceImpl implements UserService {
    private readonly userModel: UserModelType;

    constructor(userModel: UserModelType) {
        this.userModel = userModel;
    }

    public select = (loginSubstring?: string, limit?: string): Promise<UserModel[]> => {
        const options = createSequelizeFindOptions({ login: loginSubstring }, limit);

        return this.userModel.findAll(options);
    };

    public getById = (id: string): Promise<UserModel> => {
        return this.userModel.findByPk(id).then(handleDaoError('User not found'));
    };

    public create = async ({ login, password, age }: UserDTO): Promise<UserModel> => {
        const dto: UserDTO = new UserDTO(login, password, age);

        const [user, created]: [UserModel, boolean] = await this.userModel.findOrCreate({
            where: { login },
            defaults: dto
        });

        if (!created) {
            throw Boom.badRequest('This login already in use');
        }

        return user;
    };

    public update = (id: string, { password, age }: UserDTO): Promise<UserModel> => {
        return this.userModel
            .findByPk(id)
            .then(handleDaoError('User not found'))
            .then((instance: UserModel) => {
                instance.password = password || instance.password;
                instance.age = age || instance.age;
                instance.save();
                return instance;
            });
    };

    public delete = (id: string): Promise<UserModel> => {
        return this.userModel.destroy({ where: { id } }).then(handleDaoError('User not found'));
    };
}
