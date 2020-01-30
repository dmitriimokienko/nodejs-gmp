import express, { Router } from 'express';
import { methodNotAllowed, validateSchema } from '../../../middlewares';
import { groupUpdateValidation, groupValidation } from '../validation';
import container from '../../../../inversify.config';
import { TYPES } from '../../../types';
import { Controller } from '../interfaces';

export const groupRouter: Router = express.Router();

const controller: Controller = container.get<Controller>(TYPES.GroupController);

groupRouter
    .route('/groups')
    .get(controller.get.bind(controller))
    .post(validateSchema(groupValidation), controller.create.bind(controller))
    .all(methodNotAllowed);

groupRouter
    .route('/groups/:id')
    .get(controller.getById.bind(controller))
    .put(validateSchema(groupUpdateValidation), controller.update.bind(controller))
    .delete(controller.delete.bind(controller))
    .all(methodNotAllowed);

// TODO: fix
// groupRouter.all('*', notFound);
