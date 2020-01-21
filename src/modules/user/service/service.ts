import {Op} from 'sequelize';
import {pickBy} from 'lodash';
import {IUserService} from '../interfaces';
import {BodyType, UserType} from '../types';

export class UserService implements IUserService {
    private readonly userModel: any;

    constructor(userModel: any) {
        this.userModel = userModel;
    }

    // remove error handlers, validate by model
    public select = async (loginSubstring?: string, limit?: number): Promise<Array<UserType>> => {
        const isDeleted = false;
        const login = loginSubstring ? {[Op.like]: `%${loginSubstring}%`} : undefined;
        const options = pickBy({isDeleted, login, limit});

        console.log(options); // remove !!!

        return await this.userModel.findAll({where: options, raw: true});
    };

    public getById = async (id: string): Promise<UserType> => {
        const user = await this.userModel.findByPk(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    };

    public create = async ({login, password, age}: BodyType): Promise<UserType> => {
        // if (!login || !password) {
        //     throw new Error('Missing required parameters');
        // }
        return await this.userModel.create({login, password, age});
    };

    public update = async (id: string, body: BodyType): Promise<UserType> => {
        const user = await this.userModel.update(pickBy(body), {where: {id}});
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    };

    public delete = async (id: string): Promise<UserType> => {
        const user = await this.userModel.update({isDelete: true}, {where: {id}});
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    };
}
