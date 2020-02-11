import { injectable, inject } from 'inversify';
import { TYPES } from '../../../types';
import { GroupRepository, GroupService } from '../interfaces';
import { GroupModel, GroupDTO } from '../model';
import { createSequelizeFindOptions } from '../../../utils';
import { Permission } from '../constants';
import { UserGroupModel } from '../../user-group/model';

@injectable()
export class GroupServiceImpl implements GroupService {
    private readonly groupRepository: GroupRepository;

    constructor(@inject(TYPES.GroupRepository) groupRepository: GroupRepository) {
        this.groupRepository = groupRepository;
    }

    public select(nameSubstring?: string, limit?: string): Promise<GroupModel[]> {
        const options = createSequelizeFindOptions({ name: nameSubstring }, limit);
        return this.groupRepository.select(options);
    }

    public getById(id: string): Promise<GroupModel> {
        return this.groupRepository.getById(id);
    }

    public async create({ name, permissions }: GroupDTO): Promise<GroupModel> {
        const dto: GroupDTO = new GroupDTO(name, permissions);
        return this.groupRepository.create(dto);
    }

    public update(id: string, permissions: Permission[]): Promise<GroupModel> {
        return this.groupRepository.update(id, permissions);
    }

    public delete(id: string): Promise<GroupModel> {
        return this.groupRepository.delete(id);
    }

    public addUsersToGroup(id: string, userIds: string[]): Promise<UserGroupModel[]> {
        return this.groupRepository.addUsersToGroup(id, userIds);
    }
}
