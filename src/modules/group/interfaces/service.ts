import { GroupModel } from "../model";

export interface GroupService {
    select(nameSubstring: string, count?: string): Promise<GroupModel[]>;

    getById(id: string): Promise<GroupModel>;

    create(body: any): Promise<GroupModel>;

    update(id: string, body: any): Promise<GroupModel>;

    delete(id: string): Promise<GroupModel>;
}
