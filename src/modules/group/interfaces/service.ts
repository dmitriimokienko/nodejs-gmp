import { GroupModel } from '../model';
import { UserGroupModel } from '../../user-group/model';

export interface GroupService {
    select(nameSubstring: string, count?: string): Promise<GroupModel[]>;

    getById(id: string): Promise<GroupModel>;

    create(body: any): Promise<GroupModel>;

    update(id: string, body: any): Promise<GroupModel>;

    delete(id: string): Promise<GroupModel>;

    addUsersToGroup(id: string, userIds: string[]): Promise<UserGroupModel[]>;
}
