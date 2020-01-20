import express from 'express';
import {url} from '../url';
import {UserController} from './controller';
import {UserService} from '../service';
import {validateSchema} from '../../../utils';
import {userValidation} from '../validation';
// @ts-ignore
import users from '../../../../data/users.json';

export const router: express.Router = express.Router();
const controller = new UserController(new UserService(users));

router.route(url.users)
    .get(controller.get)
    .post(validateSchema(userValidation), controller.create);

router.route(url.user)
    .get(controller.getById)
    .put(validateSchema(userValidation), controller.update)
    .delete(controller.delete);
