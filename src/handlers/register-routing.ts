import { Application } from 'express';
import container from '../inversify.config';
import { TYPES } from '../types';
import { RegistrableController } from '../interfaces';

export const registerRouting = (app: Application): void => {
    const controllers: RegistrableController[] = container.getAll<RegistrableController>(TYPES.Controller);
    controllers.forEach(controller => controller.register(app));
};
