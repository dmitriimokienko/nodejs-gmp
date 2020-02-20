import Boom from '@hapi/boom';
import { logger } from '../utils';

export const logUnhandledErrors = (): void => {
    process
        .on('unhandledRejection', (reason, promise) => {
            logger.error(Boom.badImplementation(`Unhandled Rejection at: ${promise}, reason: ${reason}`));
            process.exit(1);
        })
        .on('uncaughtException', (error: Error) => {
            logger.error(Boom.badImplementation(`Uncaught Exception thrown - ${error}`));
            process.exit(1);
        });
};
