import { injectable } from 'inversify';
import { Transaction } from 'sequelize';
import Boom from '@hapi/boom';
import { GroupModel, GroupDTO } from '../model';
import { handleDaoError } from '../../../utils';
import { Permission } from '../constants';
import { GroupRepository } from '../interfaces';
import { sequelize } from '../../../../resources';
import { UserModel } from '../../user/model';
import { UsersFromGroup } from '../types';
import { UserGroupModel } from '../../user-group/model';

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
            throw Boom.conflict('This name already in use');
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

    public getUsers(id: string): Promise<UsersFromGroup[]> {
        try {
            return sequelize.transaction(async (transaction: Transaction) => {
                const group: GroupModel | null = await GroupModel.findByPk(id, { transaction });

                if (!group) {
                    throw Boom.notFound('Group not found');
                }

                return group.getUsers();
            });
        } catch (e) {
            throw Boom.badRequest(e);
        }
    }

    public async addUsersToGroup(id: string, userIds: string[]): Promise<UserGroupModel[]> {
        try {
            return sequelize.transaction(async (transaction: Transaction) => {
                const group: GroupModel | null = await GroupModel.findByPk(id, { transaction });

                if (!group) {
                    throw Boom.notFound('Group not found');
                }

                const users: UserModel[] = await Promise.all(
                    userIds.map(async (userId: string) => {
                        const user: UserModel | null = await UserModel.findByPk(userId, { transaction });

                        if (!user) {
                            throw Boom.notFound('User not found');
                        }

                        return user;
                    })
                );

                const usersGroups: UserGroupModel[] | undefined = await group.addUser(users, { transaction });

                if (!usersGroups) {
                    throw Boom.conflict(`${group.name} already contains this user/users`);
                }

                return usersGroups;
            });
        } catch (e) {
            throw Boom.badRequest(e);
        }
    }
}
