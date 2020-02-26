import { Application } from 'express';
import { sequelize } from '../../resources';
import { logger } from '../utils';
import { initializeUserTable } from '../modules/user/utils';
import { initializeGroupTable } from '../modules/group/utils';
import { initializeUsersGroupsTable } from '../modules/user-group/utils';

export const runServer = (app: Application): void => {
    sequelize
        .sync({ force: true })
        .then(initializeUserTable)
        .then(initializeGroupTable)
        .then(initializeUsersGroupsTable)
        .then(() => {
            const { HOST, PORT } = process.env;
            app.listen(PORT, () => {
                logger.info(`Application running on http://${HOST}:${PORT}`);
            });
        })
        .catch((error: Error) => {
            logger.error(error);
        });
};
