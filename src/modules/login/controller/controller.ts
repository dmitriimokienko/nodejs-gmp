import { injectable, inject } from 'inversify';
import { Request, Response, Application } from 'express';
import jwt from 'jsonwebtoken';
import { get, toNumber } from 'lodash';
import { TYPES } from '../../../types';
import { RegistrableController } from '../../../interfaces';
import { methodNotAllowed, validateSchema } from '../../../middlewares';
import { tryCatch, trackExecutionTime } from '../../../utils';
import { UserModel, userValidation, UserService } from '../../user';

@injectable()
export class LoginController implements RegistrableController {
    private readonly service: UserService;

    constructor(@inject(TYPES.UserService) service: UserService) {
        this.service = service;
    }

    public register(app: Application): void {
        app.route('/api/login')
            .post(validateSchema(userValidation), this.login)
            .all(methodNotAllowed);
    }

    @tryCatch()
    @trackExecutionTime()
    private login = async (req: Request, res: Response): Promise<void> => {
        const login = get(req, 'body.login');
        const password = get(req, 'body.password');

        const user: UserModel = await this.service.login(login, password);
        const { SECRET_KEY, JWT_EXPIRES }: any = process.env;
        const expiresIn = toNumber(JWT_EXPIRES);

        const token = jwt.sign({ id: user.id, login }, SECRET_KEY, { expiresIn });

        res.cookie('token', token, { maxAge: expiresIn * 1000 });
        res.end();
    };
}
