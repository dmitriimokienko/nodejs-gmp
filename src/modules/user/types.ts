import {Model} from 'sequelize';
import {UserModel} from './model';

export type UserType = {
    id: string,
    login: string,
    password: string,
    age: number,
    isDeleted: boolean
}

export type BodyType = {
    login: string,
    password: string,
    age: number
}

export type UserModelType = typeof Model & UserModel;
