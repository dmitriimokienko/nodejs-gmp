import {Request, Response, NextFunction} from 'express';
import {get} from 'lodash';
import autoBind from 'auto-bind';
import {IUserService} from './service';

export class UserController {
    private readonly service: IUserService;

    constructor(service: IUserService) {
        this.service = service;
        autoBind(this);
    }

    public async get(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const loginSubstring = get(req, 'query.login');
            const limit = get(req, 'query.limit');
            const users = await this.service.getAll(loginSubstring, limit);
            res.json(users);
        } catch (e) {
            res.status(400).send(e.message);
            next(e);
        }
    }

    public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = get(req, 'params.id');
            const user = await this.service.getById(id);
            res.json(user);
        } catch (e) {
            res.status(400).send(e.message);
            next(e);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {body = {}} = req;
            const user = await this.service.create(body);
            res.json(user);
        } catch (e) {
            res.status(400).send(e.message);
            next(e);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = get(req, 'params.id');
            const {body = {}} = req;
            const user = await this.service.update(id, body);
            res.json(user);
        } catch (e) {
            res.status(400).send(e.message);
            next(e);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = get(req, 'params.id');
            const user = await this.service.delete(id);
            res.json(user);
        } catch (e) {
            res.status(400).send(e.message);
            next(e);
        }
    }
}
