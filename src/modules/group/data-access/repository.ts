import { injectable } from 'inversify';
import { Transaction } from 'sequelize';
import { find } from 'lodash';
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

    public async addUsersToGroup(id: string, userIds: string[]): Promise<void> {
        try {
            return sequelize.transaction(async (transaction: Transaction) => {
                const group: GroupModel | null = await GroupModel.findByPk(id, { transaction });

                if (!group) {
                    throw Boom.badRequest(`Group not found`);
                }

                await Promise.all(
                    userIds.map(async (userId: string) => {
                        const user: UserModel | null = await UserModel.findByPk(userId, { transaction });

                        if (!user) {
                            throw Boom.badRequest(`User not found`);
                        }

                        const users: UserModel[] = await group.getUsers();
                        const hasUser: boolean = Boolean(find(users, ({ id }: UserModel) => id === user.id));

                        if (hasUser) {
                            throw Boom.badRequest(`${group.name} already contains ${user.login}`);
                        }

                        await group.addUser(user, { transaction });
                    })
                );
            });
        } catch (e) {
            throw Boom.badRequest(e);
        }
    }
}
