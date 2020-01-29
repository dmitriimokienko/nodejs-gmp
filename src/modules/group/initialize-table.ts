import { GroupModel } from './model';
// @ts-ignore
import groups from '../../../data/users.json';

export const initializeGroupTable = () => {
    GroupModel.bulkCreate(groups);
};
