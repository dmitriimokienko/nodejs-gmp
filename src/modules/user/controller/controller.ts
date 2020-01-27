import {Request, Response, NextFunction} from 'express';
import {get} from 'lodash';
import {UserService} from '../interfaces';
import {UserModel} from '../model';

export class UserController {
    private readonly service: UserService;

    constructor(service: UserService) {
        this.service = service;
    }

    public get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const loginSubstring = get(req, 'query.login');
            const limit = get(req, 'query.limit');

            const users: UserModel[] = await this.service.select(loginSubstring, limit);

            res.json(users);
        } catch (e) {
            next(e);
        }
    };

    public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = get(req, 'params.id');

            const user: UserModel = await this.service.getById(id);

            res.json(user);
        } catch (e) {
            next(e);
        }
    };

    public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const login = get(req, 'body.login');
            const password = get(req, 'body.password');
            const age = get(req, 'body.age', null);

            const user: UserModel = await this.service.create({login, password, age});

            res.json(user);
        } catch (e) {
            next(e);
        }
    };

    public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = get(req, 'params.id');

            const login = get(req, 'body.login');
            const password = get(req, 'body.password');
            const age = get(req, 'body.age', null);

            const user: UserModel = await this.service.update(id, {login, password, age});

            res.json(user);
        } catch (e) {
            next(e);
        }
    };

    public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = get(req, 'params.id');

            const user: UserModel = await this.service.delete(id);

            res.json(user);
        } catch (e) {
            next(e);
        }
    };
}
