import { GroupModel } from '../model';
import groups from '../../../../data/groups.json';

export const initializeGroupTable = () => {
    GroupModel.bulkCreate(groups);
};
