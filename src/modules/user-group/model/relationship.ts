import { UserGroupModel } from './dao';
import { UserModel } from '../../user/model';
import { GroupModel } from '../../group/model';

UserModel.belongsToMany(GroupModel, { through: UserGroupModel });
GroupModel.belongsToMany(UserModel, { through: UserGroupModel });
