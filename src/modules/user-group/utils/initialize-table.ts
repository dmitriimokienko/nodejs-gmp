import { UserGroupModel } from '../model';
// @ts-ignore
import usersGroups from '../../../../data/users-groups.json';

export const initializeUsersGroupsTable = () => {
    UserGroupModel.bulkCreate(usersGroups);
};
