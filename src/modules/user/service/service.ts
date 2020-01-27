import {pickBy} from 'lodash';
import {UserService} from '../interfaces';
import {UserModelType} from '../types';
import {UserModel} from '../model';
import {handleDaoError, prepareLimit, prepareLogin} from '../../../utils';
import {UserDTO} from '../dto';

export class UserServiceImpl implements UserService {
    private readonly userModel: UserModelType;

    constructor(userModel: UserModelType) {
        this.userModel = userModel;
    }

    public select = (loginSubstring?: string, count?: string): Promise<UserModel[]> => {
        const login = prepareLogin(loginSubstring);
        const limit = prepareLimit(count);

        const where = pickBy({isDeleted: false, login});
        const options = pickBy({where, limit, raw: true});

        return this.userModel.findAll(options);
    };

    public getById = (id: string): Promise<UserModel> => {
        return this.userModel.findByPk(id)
            .then(handleDaoError('User not found'));
    };

    public create = ({login, password, age}: UserDTO): Promise<UserModel> => {
        const user: UserDTO = new UserDTO(login, password, age);
        return this.userModel.create(user)
            .then(handleDaoError('Missing required parameters'));
    };

    public update = (id: string, {password, age}: UserDTO): Promise<UserModel> => {
        return this.userModel.findByPk(id)
            .then((instance: any) => {
                instance.password = password || instance.password;
                instance.age = age || instance.age;
                instance.save();
                return instance;
            })
            .then(handleDaoError('User not found'));
    };

    public delete = (id: string): Promise<UserModel> => {
        return this.userModel.update({isDelete: true}, {where: {id}})
            .then(handleDaoError('User not found'));
    };
}