import { injectable, inject } from 'inversify';
// TODO: use once
import 'reflect-metadata';
import { Request, Response, NextFunction, Application } from 'express';
import { get } from 'lodash';
import { TYPES } from '../../../types';
import { RegistrableController } from '../../../interfaces';
import { UserService } from '../interfaces';
import { UserModel, userValidation, userUpdateValidation } from '../model';
import { methodNotAllowed, validateSchema } from '../../../middlewares';

@injectable()
export class UserController implements RegistrableController {
    private readonly service: UserService;

    constructor(@inject(TYPES.UserService) service: UserService) {
        this.service = service;
    }

    public register(app: Application): void {
        app.route('/api/users')
            .get(this.get)
            .post(validateSchema(userValidation), this.create)
            .all(methodNotAllowed);

        app.route('/api/users/:id')
            .get(this.getById)
            .put(validateSchema(userUpdateValidation), this.update)
            .delete(this.delete)
            .all(methodNotAllowed);
    }

    private get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const loginSubstring = get(req, 'query.login');
            const limit = get(req, 'query.limit');

            const users: UserModel[] = await this.service.select(loginSubstring, limit);

            res.json(users);
        } catch (e) {
            next(e);
        }
    };

    private getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = get(req, 'params.id');

            const user: UserModel = await this.service.getById(id);

            res.json(user);
        } catch (e) {
            next(e);
        }
    };

    private create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const login = get(req, 'body.login');
            const password = get(req, 'body.password');
            const age = get(req, 'body.age', null);

            const user: UserModel = await this.service.create({ login, password, age });

            res.status(201).json(user);
        } catch (e) {
            next(e);
        }
    };

    private update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = get(req, 'params.id');
            const password = get(req, 'body.password');
            const age = get(req, 'body.age', null);

            const user: UserModel = await this.service.update(id, { password, age });

            res.json(user);
        } catch (e) {
            next(e);
        }
    };

    private delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = get(req, 'params.id');

            const user: UserModel = await this.service.delete(id);

            res.json(user);
        } catch (e) {
            next(e);
        }
    };
}
