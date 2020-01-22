import express, {Router} from 'express';
import {url} from '../url';
import {UserController} from './controller';
import {UserService} from '../service';
import {validateSchema} from '../../../middlewares';
import {userValidation} from '../validation';
import {UserModel} from '../model';

export const userRouter: Router = express.Router();

const controller = new UserController(new UserService(UserModel));

userRouter.route(url.users)
    .get(controller.get)
    .post(validateSchema(userValidation), controller.create);

userRouter.route(url.user)
    .get(controller.getById)
    .put(validateSchema(userValidation), controller.update)
    .delete(controller.delete);
