import { Model } from 'sequelize';
import { GroupModel } from './model';

export type GroupModelType = typeof Model & typeof GroupModel;
