import { GroupDTO, GroupModel } from '../model';
import { UserGroupModel } from '../../user-group/model';
import { UsersFromGroup } from '../types';
import {Permission} from "../constants";

export interface GroupRepository {
    select(options: Record<string, unknown>): Promise<GroupModel[]>;

    getById(id: string): Promise<GroupModel>;

    create(dto: GroupDTO): Promise<GroupModel>;

    update(id: string, permissions: Permission[]): Promise<GroupModel>;

    delete(id: string): Promise<GroupModel>;

    getUsers(id: string): Promise<UsersFromGroup[]>;

    addUsersToGroup(id: string, userIds: string[]): Promise<UserGroupModel[]>;
}
