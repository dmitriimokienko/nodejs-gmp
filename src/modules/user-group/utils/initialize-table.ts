import { UserGroupModel } from '../model';
import usersGroups from '../../../../data/users-groups.json';

export const initializeUsersGroupsTable = () => {
    UserGroupModel.bulkCreate(usersGroups);
};
