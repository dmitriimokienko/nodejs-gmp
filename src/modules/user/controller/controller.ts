import { injectable, inject } from 'inversify';
import { Request, Response, Application } from 'express';
import { get } from 'lodash';
import { TYPES } from '../../../types';
import { RegistrableController } from '../../../interfaces';
import { UserService } from '../interfaces';
import { UserModel, userValidation, userUpdateValidation } from '../model';
import { methodNotAllowed, validateSchema, checkToken } from '../../../middlewares';
import { trackExecutionTime, tryCatch } from '../../../utils';

@injectable()
export class UserController implements RegistrableController {
    private readonly service: UserService;

    constructor(@inject(TYPES.UserService) service: UserService) {
        this.service = service;
    }

    public register(app: Application): void {
        app.route('/api/users')
            .get(checkToken, this.get)
            .post([validateSchema(userValidation), checkToken], this.create)
            .all(methodNotAllowed);

        app.route('/api/users/:id')
            .get(checkToken, this.getById)
            .put([validateSchema(userUpdateValidation), checkToken], this.update)
            .delete(checkToken, this.delete)
            .all(methodNotAllowed);
    }

    @tryCatch()
    @trackExecutionTime()
    private get = async (req: Request, res: Response): Promise<void> => {
        const loginSubstring = get(req, 'query.login');
        const limit = get(req, 'query.limit');
        const users: UserModel[] = await this.service.select(loginSubstring, limit);

        res.json(users);
    };

    @tryCatch()
    @trackExecutionTime()
    private getById = async (req: Request, res: Response): Promise<void> => {
        const id = get(req, 'params.id');
        const user: UserModel = await this.service.getById(id);

        res.json(user);
    };

    @tryCatch()
    @trackExecutionTime()
    private create = async (req: Request, res: Response): Promise<void> => {
        const login = get(req, 'body.login');
        const password = get(req, 'body.password');
        const age = get(req, 'body.age', null);
        const user: UserModel = await this.service.create({ login, password, age });

        res.status(201).json(user);
    };

    @tryCatch()
    @trackExecutionTime()
    private update = async (req: Request, res: Response): Promise<void> => {
        const id = get(req, 'params.id');
        const password = get(req, 'body.password');
        const age = get(req, 'body.age', null);
        const user: UserModel = await this.service.update(id, { password, age });

        res.json(user);
    };

    @tryCatch()
    @trackExecutionTime()
    private delete = async (req: Request, res: Response): Promise<void> => {
        const id = get(req, 'params.id');
        const user: UserModel = await this.service.delete(id);

        res.json(user);
    };
}
