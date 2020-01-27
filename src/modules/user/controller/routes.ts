import express, {Router} from 'express';
import {url} from '../url';
import {UserController} from './controller';
import {UserServiceImpl} from '../service';
import {methodNotAllowed, notFound, validateSchema} from '../../../middlewares';
import {userUpdateValidation, userValidation} from '../validation';
import {UserModel} from '../model';

export const userRouter: Router = express.Router();

const service = new UserServiceImpl(UserModel);
const controller = new UserController(service);

userRouter.route(url.users)
    .get(controller.get)
    .post(validateSchema(userValidation), controller.create)
    .all(methodNotAllowed);

userRouter.route(url.user)
    .get(controller.getById)
    .put(validateSchema(userUpdateValidation), controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed);

userRouter.all('*', notFound);
