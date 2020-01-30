import express, { Router } from 'express';
import { GroupController } from './controller';
import { GroupServiceImpl } from '../service';
import { methodNotAllowed, validateSchema } from '../../../middlewares';
import { groupUpdateValidation, groupValidation } from '../validation';
import { GroupModel } from '../model';

export const groupRouter: Router = express.Router();

const service = new GroupServiceImpl(GroupModel);
const controller = new GroupController(service);

groupRouter
    .route('/groups')
    .get(controller.get)
    .post(validateSchema(groupValidation), controller.create)
    .all(methodNotAllowed);

groupRouter
    .route('/groups/:id')
    .get(controller.getById)
    .put(validateSchema(groupUpdateValidation), controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed);

// TODO: fix
// groupRouter.all('*', notFound);
