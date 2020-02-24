import { injectable } from 'inversify';
import { Transaction } from 'sequelize';
import Boom from '@hapi/boom';
import { GroupModel, GroupDTO } from '../model';
import { handleDaoError, logger, trackExecutionTime } from '../../../utils';
import { Permission } from '../constants';
import { GroupRepository } from '../interfaces';
import { sequelize } from '../../../../resources';
import { UserModel } from '../../user/model';
import { UsersFromGroup } from '../types';
import { UserGroupModel } from '../../user-group/model';

@injectable()
export class GroupRepositoryImplDb implements GroupRepository {
    @trackExecutionTime
    public select(options: Record<string, unknown>): Promise<GroupModel[]> {
        return GroupModel.findAll(options);
    }

    @trackExecutionTime
    public getById(id: string): Promise<GroupModel> {
        return GroupModel.findByPk(id).then(handleDaoError(`getById(${id}) - Group not found`));
    }

    @trackExecutionTime
    public async create(dto: GroupDTO): Promise<GroupModel> {
        const [group, created]: [GroupModel, boolean] = await GroupModel.findOrCreate({
            where: { name: dto.name },
            defaults: dto
        });

        if (!created) {
            const err = Boom.conflict(`create(${dto}) - This name already in use`);

            logger.error(err);
            throw err;
        }

        return group;
    }

    @trackExecutionTime
    public update(id: string, permissions: Permission[]): Promise<GroupModel> {
        return GroupModel.findByPk(id)
            .then(handleDaoError(`update(${id}, ${permissions}) - Group not found`))
            .then((instance: GroupModel) => {
                instance.permissions = permissions || instance.permissions;
                instance.save();
                return instance;
            });
    }

    @trackExecutionTime
    public delete(id: string): Promise<GroupModel> {
        return GroupModel.destroy({ where: { id } }).then(handleDaoError(`delete(${id}) - Group not found`));
    }

    @trackExecutionTime
    public async getUsers(id: string): Promise<UsersFromGroup[]> {
        try {
            return sequelize.transaction(async (transaction: Transaction) => {
                const group: GroupModel | null = await GroupModel.findByPk(id, { transaction });

                if (!group) {
                    const err = Boom.notFound(`getUsers(${id}) - Group not found`);

                    logger.error(err);
                    throw err;
                }

                return group.getUsers();
            });
        } catch (e) {
            logger.error(e);
            throw Boom.badRequest(e);
        }
    }

    @trackExecutionTime
    public async addUsersToGroup(id: string, userIds: string[]): Promise<UserGroupModel[]> {
        try {
            return sequelize.transaction(async (transaction: Transaction) => {
                const group: GroupModel | null = await GroupModel.findByPk(id, { transaction });

                if (!group) {
                    const err = Boom.notFound(`addUsersToGroup(${id}, ${userIds}) - Group not found`);

                    logger.error(err);
                    throw err;
                }

                const users: UserModel[] = await Promise.all(
                    userIds.map(async (userId: string) => {
                        const user: UserModel | null = await UserModel.findByPk(userId, { transaction });

                        if (!user) {
                            const err = Boom.notFound(`addUsersToGroup(${id}, ${userIds}) - User not found`);

                            logger.error(err);
                            throw err;
                        }

                        return user;
                    })
                );

                const usersGroups: UserGroupModel[] | undefined = await group.addUser(users, { transaction });

                if (!usersGroups) {
                    const err = Boom.conflict(
                        `addUsersToGroup(${id}, ${userIds}) - ${group.name} already contains this user/users`
                    );

                    logger.error(err);
                    throw err;
                }

                return usersGroups;
            });
        } catch (e) {
            logger.error(e);
            throw Boom.badRequest(e);
        }
    }
}
