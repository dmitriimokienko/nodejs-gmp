import express from 'express';
import {url} from './url';
import {UserController} from './controller';
import {UserService} from './service';
import {validateSchema} from '../../utils';
import {userSchema} from './model';
// @ts-ignore
import users from '../../../data/users.json';

export const router: express.Router = express.Router();
const controller = new UserController(new UserService(users));

router.route(url.users)
    .get(controller.get)
    .post(validateSchema(userSchema), controller.create);

router.route(url.user)
    .get(controller.getById)
    .put(validateSchema(userSchema), controller.update)
    .delete(controller.delete);
