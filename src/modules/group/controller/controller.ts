import { injectable, inject } from 'inversify';
import { Request, Response, Application } from 'express';
import { get } from 'lodash';
import { TYPES } from '../../../types';
import { RegistrableController } from '../../../interfaces';
import { GroupService } from '../interfaces';
import { GroupModel, groupUpdateValidation, groupValidation } from '../model';
import { checkToken, methodNotAllowed, validateSchema } from '../../../middlewares';
import { UserGroupModel } from '../../user-group/model';
import { UsersFromGroup } from '../types';
import { tryCatch, trackExecutionTime } from '../../../utils';

@injectable()
export class GroupController implements RegistrableController {
    private readonly service: GroupService;

    constructor(@inject(TYPES.GroupService) service: GroupService) {
        this.service = service;
    }

    public register(app: Application): void {
        app.route('/api/groups/:id/users')
            .get(checkToken, this.getUsers)
            .put(checkToken, this.addUsersToGroup)
            .all(methodNotAllowed);

        app.route('/api/groups/:id')
            .get(checkToken, this.getById)
            .put([validateSchema(groupUpdateValidation), checkToken], this.update)
            .delete(checkToken, this.delete)
            .all(methodNotAllowed);

        app.route('/api/groups')
            .get(checkToken, this.get)
            .post([validateSchema(groupValidation), checkToken], this.create)
            .all(methodNotAllowed);
    }

    @tryCatch()
    @trackExecutionTime()
    private get = async (req: Request, res: Response): Promise<void> => {
        const nameSubstring = get(req, 'query.name');
        const limit = get(req, 'query.limit');
        const groups: GroupModel[] = await this.service.select(nameSubstring, limit);

        res.json(groups);
    };

    @tryCatch()
    @trackExecutionTime()
    private getById = async (req: Request, res: Response): Promise<void> => {
        const id = get(req, 'params.id');
        const group: GroupModel = await this.service.getById(id);

        res.json(group);
    };

    @tryCatch()
    @trackExecutionTime()
    private create = async (req: Request, res: Response): Promise<void> => {
        const name = get(req, 'body.name');
        const permissions = get(req, 'body.permissions');
        const group: GroupModel = await this.service.create({ name, permissions });

        res.status(201).json(group);
    };

    @tryCatch()
    @trackExecutionTime()
    private update = async (req: Request, res: Response): Promise<void> => {
        const id = get(req, 'params.id');
        const permissions = get(req, 'body.permissions');
        const group: GroupModel = await this.service.update(id, permissions);

        res.json(group);
    };

    @tryCatch()
    @trackExecutionTime()
    private delete = async (req: Request, res: Response): Promise<void> => {
        const id = get(req, 'params.id');
        const group: GroupModel = await this.service.delete(id);

        res.json(group);
    };

    @tryCatch()
    @trackExecutionTime()
    private getUsers = async (req: Request, res: Response): Promise<void> => {
        const id = get(req, 'params.id');
        const users: UsersFromGroup[] = await this.service.getUsers(id);

        res.json(users);
    };

    @tryCatch()
    @trackExecutionTime()
    private addUsersToGroup = async (req: Request, res: Response): Promise<void> => {
        const id = get(req, 'params.id');
        const userIds = get(req, 'body.userIds', []);
        const usersGroups: UserGroupModel[] = await this.service.addUsersToGroup(id, userIds);

        res.status(201).json(usersGroups);
    };
}
