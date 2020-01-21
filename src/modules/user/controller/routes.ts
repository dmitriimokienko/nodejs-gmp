import express, {Router} from 'express';
import {url} from '../url';
import {UserController} from './controller';
import {UserService} from '../service';
import {validateSchema} from '../../../middlewares';
import {userValidation} from '../validation';
import {UserModel} from '../model';

export const router: Router = express.Router();

const controller = new UserController(new UserService(UserModel));

router.route(url.users)
    .get(controller.get)
    .post(validateSchema(userValidation), controller.create);

router.route(url.user)
    .get(controller.getById)
    .put(validateSchema(userValidation), controller.update)
    .delete(controller.delete);
