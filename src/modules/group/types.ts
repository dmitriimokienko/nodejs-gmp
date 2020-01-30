import { Model } from 'sequelize';
import { GroupModel } from './model';

export type GroupSequelizeModel = typeof Model & typeof GroupModel;
