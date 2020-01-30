import Boom from '@hapi/boom';
import { GroupService } from '../interfaces';
import { GroupModelType } from '../types';
import { GroupModel } from '../model';
import { createSequelizeFindOptions, handleDaoError } from '../../../utils';
import { GroupDTO } from '../dto';
import { Permission } from '../permission';

export class GroupServiceImpl implements GroupService {
    private readonly groupModel: GroupModelType;

    constructor(groupModel: GroupModelType) {
        this.groupModel = groupModel;
    }

    public select = (nameSubstring?: string, limit?: string): Promise<GroupModel[]> => {
        const options = createSequelizeFindOptions({ name: nameSubstring }, limit);

        return this.groupModel.findAll(options);
    };

    public getById = (id: string): Promise<GroupModel> => {
        return this.groupModel.findByPk(id).then(handleDaoError('Group not found'));
    };

    public create = async ({ name, permissions }: GroupDTO): Promise<GroupModel> => {
        const dto: GroupDTO = new GroupDTO(name, permissions);

        const [group, created]: [GroupModel, boolean] = await this.groupModel.findOrCreate({
            where: { name },
            defaults: dto
        });

        if (!created) {
            throw Boom.badRequest('This name already in use');
        }

        return group;
    };

    public update = (id: string, permissions: Permission[]): Promise<GroupModel> => {
        return this.groupModel
            .findByPk(id)
            .then(handleDaoError('Group not found'))
            .then((instance: GroupModel) => {
                instance.permissions = permissions || instance.permissions;
                instance.save();
                return instance;
            });
    };

    public delete = (id: string): Promise<GroupModel> => {
        return this.groupModel.destroy({ where: { id } }).then(handleDaoError('Group not found'));
    };
}
