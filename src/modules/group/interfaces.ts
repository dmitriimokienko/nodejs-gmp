import { GroupModel, GroupDTO } from './model';

export interface GroupService {
    select(nameSubstring: string, count?: string): Promise<GroupModel[]>;

    getById(id: string): Promise<GroupModel>;

    create(body: any): Promise<GroupModel>;

    update(id: string, body: any): Promise<GroupModel>;

    delete(id: string): Promise<GroupModel>;
}

export interface GroupRepository {
    select(options: Object): Promise<GroupModel[]>;

    getById(id: string): Promise<GroupModel>;

    create(dto: GroupDTO): Promise<GroupModel>;

    update(id: string, body: any): Promise<GroupModel>;

    delete(id: string): Promise<GroupModel>;
}
