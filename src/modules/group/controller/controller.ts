import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import { TYPES } from '../../../types';
import { Controller, GroupService } from '../interfaces';
import { GroupModel } from '../model';

@injectable()
export class GroupController implements Controller {
    private readonly service: GroupService;

    constructor(@inject(TYPES.GroupService) service: GroupService) {
        this.service = service;
    }

    public get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const nameSubstring = get(req, 'query.name');
            const limit = get(req, 'query.limit');

            const groups: GroupModel[] = await this.service.select(nameSubstring, limit);

            res.json(groups);
        } catch (e) {
            next(e);
        }
    };

    public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = get(req, 'params.id');

            const group: GroupModel = await this.service.getById(id);

            res.json(group);
        } catch (e) {
            next(e);
        }
    };

    public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const name = get(req, 'body.name');
            const permissions = get(req, 'body.permissions');

            const group: GroupModel = await this.service.create({ name, permissions });

            res.json(group);
        } catch (e) {
            next(e);
        }
    };

    public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = get(req, 'params.id');
            const permissions = get(req, 'body.permissions');

            const group: GroupModel = await this.service.update(id, permissions);

            res.json(group);
        } catch (e) {
            next(e);
        }
    };

    public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = get(req, 'params.id');

            const group: GroupModel = await this.service.delete(id);

            res.json(group);
        } catch (e) {
            next(e);
        }
    };
}
