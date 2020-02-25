import { UserModel } from '../model';
import users from '../../../../data/users.json';

export const initializeUserTable = () => {
    UserModel.bulkCreate(users);
};
