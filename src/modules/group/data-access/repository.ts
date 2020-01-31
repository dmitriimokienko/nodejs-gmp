import { injectable } from 'inversify';
import 'reflect-metadata';
import Boom from '@hapi/boom';
import { GroupModel, GroupDTO } from '../model';
import { handleDaoError } from '../../../utils';
import { Permission } from '../constants';
import { GroupRepository } from '../interfaces';

@injectable()
export class GroupRepositoryImplPostgres implements GroupRepository {
    public select(options: Object): Promise<GroupModel[]> {
        return GroupModel.findAll(options);
    }

    public getById = (id: string): Promise<GroupModel> => {
        return GroupModel.findByPk(id).then(handleDaoError('Group not found'));
    };

    public async create(dto: GroupDTO): Promise<GroupModel> {
        const [group, created]: [GroupModel, boolean] = await GroupModel.findOrCreate({
            where: { name: dto.name },
            defaults: dto
        });

        if (!created) {
            throw Boom.badRequest('This name already in use');
        }

        return group;
    }

    public update(id: string, permissions: Permission[]): Promise<GroupModel> {
        return GroupModel.findByPk(id)
            .then(handleDaoError('Group not found'))
            .then((instance: GroupModel) => {
                instance.permissions = permissions || instance.permissions;
                instance.save();
                return instance;
            });
    }

    public delete(id: string): Promise<GroupModel> {
        return GroupModel.destroy({ where: { id } }).then(handleDaoError('Group not found'));
    }
}
