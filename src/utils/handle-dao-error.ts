import Boom from '@hapi/boom';

type Entity = any;

export const handleDaoError = (message: string) => (entity: Entity): Entity => {
    if (!entity) {
        throw Boom.notFound(message);
    }

    return entity;
};
