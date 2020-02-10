import { injectable } from 'inversify';
import Boom from '@hapi/boom';
import { GroupModel, GroupDTO } from '../model';
import { handleDaoError } from '../../../utils';
import { Permission } from '../constants';
import { GroupRepository } from '../interfaces';
import { sequelize } from '../../../../resources';
import { UserModel } from '../../user/model';

@injectable()
export class GroupRepositoryImplDb implements GroupRepository {
    public select(options: Object): Promise<GroupModel[]> {
        return GroupModel.findAll(options);
    }

    public getById(id: string): Promise<GroupModel> {
        return GroupModel.findByPk(id).then(handleDaoError('Group not found'));
    }

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

    // todo: fix ts
    public async addUsersToGroup(id: string, userIds: string[]): Promise<any> {
        try {
            sequelize.transaction(async transaction => {
                const group = await GroupModel.findByPk(id, { transaction });
                const users = await Promise.all(
                    userIds.map(async (userId: string) => await UserModel.findByPk(userId, { transaction }))
                );

                // @ts-ignore
                await group.addUser(users, { transaction });
            });
        } catch (e) {
            handleDaoError(e);
        }
    }
}
