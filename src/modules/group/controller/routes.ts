import express, { Router } from 'express';
import { methodNotAllowed, validateSchema } from '../../../middlewares';
import { groupUpdateValidation, groupValidation } from '../validation';
import container from "../../../../inversify.config";
import {TYPES} from "../../../types";
import {Controller} from "../interfaces";

export const groupRouter: Router = express.Router();

// const service = container.get<GroupService>(TYPES.GroupService);
const controller = container.get<Controller>(TYPES.GroupController);

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
