import {pickBy} from 'lodash';
import {IUserService} from '../interfaces';
import {BodyType, UserType} from '../types';
import {handleDaoError, prepareLimit, prepareLogin} from '../../../utils';

export class UserService implements IUserService {
    private readonly userModel: any;

    constructor(userModel: any) {
        this.userModel = userModel;
    }

    // add data-layer
    public select = async (loginSubstring?: string, count?: string): Promise<Array<UserType>> => {
        const login = prepareLogin(loginSubstring);
        const limit = prepareLimit(count);

        const where = pickBy({isDeleted: false, login});
        const options = pickBy({where, limit, raw: true});

        return this.userModel.findAll(options);
    };

    public getById = async (id: string): Promise<UserType> => {
        return this.userModel.findByPk(id)
            .then(handleDaoError('User not found'));
    };

    public create = async ({login, password, age}: BodyType): Promise<UserType> => {
        return this.userModel.create({login, password, age})
            .then(handleDaoError('Missing required parameters'));
    };

    // wait login and pass -> change validation
    public update = async (id: string, body: BodyType): Promise<UserType> => {
        return this.userModel.update(pickBy(body), {where: {id}})
            .then(handleDaoError('User not found'));
    };

    public delete = async (id: string): Promise<UserType> => {
        return this.userModel.update({isDelete: true}, {where: {id}})
            .then(handleDaoError('User not found'));
    };
}
