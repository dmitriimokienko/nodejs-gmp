import Boom from '@hapi/boom';
import { logger } from './logger';

type Entity = any;

export const handleDaoError = (message: string) => (entity: Entity): Entity => {
    if (!entity) {
        const err = Boom.notFound(message);

        logger.error(err);
        throw err;
    }

    return entity;
};
