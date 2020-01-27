import createError from 'http-errors';

export const handleDaoError = (message: string) => (entity: any) => {
    if (!entity) {
        throw createError(400, message);
    }
    return entity;
};
