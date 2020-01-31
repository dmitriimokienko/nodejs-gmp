import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { Request, Response, NextFunction, Application } from 'express';
import { get } from 'lodash';
import { TYPES } from '../../../types';
import { RegistrableController } from '../../../interfaces';
import { GroupService } from '../interfaces';
import { GroupModel, groupUpdateValidation, groupValidation } from '../model';
import { methodNotAllowed, validateSchema } from '../../../middlewares';

@injectable()
export class GroupController implements RegistrableController {
    private readonly service: GroupService;

    constructor(@inject(TYPES.GroupService) service: GroupService) {
        this.service = service;
    }

    public register(app: Application): void {
        app.route('/api/groups')
            .get(this.get)
            .post(validateSchema(groupValidation), this.create)
            .all(methodNotAllowed);

        app.route('/api/groups/:id')
            .get(this.getById)
            .put(validateSchema(groupUpdateValidation), this.update)
            .delete(this.delete)
            .all(methodNotAllowed);
    }

    private get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const nameSubstring = get(req, 'query.name');
            const limit = get(req, 'query.limit');

            const groups: GroupModel[] = await this.service.select(nameSubstring, limit);

            res.json(groups);
        } catch (e) {
            next(e);
        }
    };

    private getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = get(req, 'params.id');

            const group: GroupModel = await this.service.getById(id);

            res.json(group);
        } catch (e) {
            next(e);
        }
    };

    private create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const name = get(req, 'body.name');
            const permissions = get(req, 'body.permissions');

            const group: GroupModel = await this.service.create({ name, permissions });

            res.status(201).json(group);
        } catch (e) {
            next(e);
        }
    };

    private update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = get(req, 'params.id');
            const permissions = get(req, 'body.permissions');

            const group: GroupModel = await this.service.update(id, permissions);

            res.json(group);
        } catch (e) {
            next(e);
        }
    };

    private delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = get(req, 'params.id');

            const group: GroupModel = await this.service.delete(id);

            res.json(group);
        } catch (e) {
            next(e);
        }
    };
}
