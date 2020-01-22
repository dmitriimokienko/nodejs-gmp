import {Op} from 'sequelize';
import {pickBy} from 'lodash';
import {IUserService} from '../interfaces';
import {BodyType, UserType} from '../types';

export class UserService implements IUserService {
    private readonly userModel: any;

    constructor(userModel: any) {
        this.userModel = userModel;
    }

    public select = async (loginSubstring?: string, limit?: number | string): Promise<Array<UserType>> => {
        const isDeleted = false;
        const login = loginSubstring ? {[Op.like]: `%${loginSubstring}%`} : undefined;

        // limit does't work
        const where = pickBy({isDeleted, login, limit});

        return await this.userModel.findAll({where, raw: true});
    };

    public getById = async (id: string): Promise<UserType> => {
        return await this.userModel.findByPk(id);
    };

    public create = async ({login, password, age}: BodyType): Promise<UserType> => {
        return await this.userModel.create({login, password, age});
    };

    // wait login and pass -> change validation
    public update = async (id: string, body: BodyType): Promise<UserType> => {
        return await this.userModel.update(pickBy(body), {where: {id}});
    };

    public delete = async (id: string): Promise<UserType> => {
        return await this.userModel.update({isDelete: true}, {where: {id}});
    };
}
