import { GroupDTO, GroupModel } from '../model';
import { UserGroupModel } from '../../user-group/model';
import { UsersFromGroup } from '../types';

export interface GroupRepository {
    select(options: Object): Promise<GroupModel[]>;

    getById(id: string): Promise<GroupModel>;

    create(dto: GroupDTO): Promise<GroupModel>;

    update(id: string, body: any): Promise<GroupModel>;

    delete(id: string): Promise<GroupModel>;

    getUsers(id: string): Promise<UsersFromGroup[]>;

    addUsersToGroup(id: string, userIds: string[]): Promise<UserGroupModel[]>;
}
