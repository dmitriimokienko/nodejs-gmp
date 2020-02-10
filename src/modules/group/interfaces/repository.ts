import { GroupDTO, GroupModel } from '../model';

export interface GroupRepository {
    select(options: Object): Promise<GroupModel[]>;

    getById(id: string): Promise<GroupModel>;

    create(dto: GroupDTO): Promise<GroupModel>;

    update(id: string, body: any): Promise<GroupModel>;

    delete(id: string): Promise<GroupModel>;

    // todo: fix ts
    addUsersToGroup(id: string, userIds: string[]): Promise<any>;
}
