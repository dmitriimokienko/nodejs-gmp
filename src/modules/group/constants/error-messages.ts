import { GroupDTO, GroupModel } from '../model';
import { Permission } from './permission';

export const ErrorMessages = {
    getById: (id: string) => `getById(${id}) - Group not found`,
    create: (dto: GroupDTO) => `create(${dto}) - This name already in use`,
    update: (id: string, permissions: Permission[]) => `update(${id}, ${permissions}) - Group not found`,
    delete: (id: string) => `delete(${id}) - Group not found`,
    getUsers: (id: string) => `getUsers(${id}) - Group not found`,
    addUsersToGroup: {
        group: (id: string, userIds: string[]) => `addUsersToGroup(${id}, ${userIds}) - Group not found`,
        user: (id: string, userIds: string[]) => `addUsersToGroup(${id}, ${userIds}) - User not found`,
        usersGroups: (id: string, userIds: string[], group: GroupModel) =>
            `addUsersToGroup(${id}, ${userIds}) - ${group.name} already contains this user/users`
    }
};
