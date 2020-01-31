import { UserModel } from '../model';
// @ts-ignore
import users from '../../../../data/users.json';

export const initializeUserTable = () => {
    UserModel.bulkCreate(users);
};
