import { Model } from 'sequelize';
import { UserModel } from './model';

export type UserModelType = typeof Model & typeof UserModel;

export type BodyType = {
    login: string;
    password: string;
    age: number;
};
