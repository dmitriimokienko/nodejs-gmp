import { GroupModel } from '../model';
// @ts-ignore
import groups from '../../../../data/groups.json';

export const initializeGroupTable = () => {
    GroupModel.bulkCreate(groups);
};
