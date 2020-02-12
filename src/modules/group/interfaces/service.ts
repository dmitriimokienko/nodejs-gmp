import { GroupModel } from '../model';
import { UserGroupModel } from '../../user-group/model';
import { UsersFromGroup } from '../types';

export interface GroupService {
    select(nameSubstring: string, count?: string): Promise<GroupModel[]>;

    getById(id: string): Promise<GroupModel>;

    create(body: any): Promise<GroupModel>;

    update(id: string, body: any): Promise<GroupModel>;

    delete(id: string): Promise<GroupModel>;

    getUsers(id: string): Promise<UsersFromGroup[]>;

    addUsersToGroup(id: string, userIds: string[]): Promise<UserGroupModel[]>;
}
