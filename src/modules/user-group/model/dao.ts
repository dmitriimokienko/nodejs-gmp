import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../../resources';
import { GroupModel } from '../../group/model';
import { UserModel } from '../../user/model';

const attributes = {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    groupId: {
        type: DataTypes.UUID,
        references: {
            model: GroupModel,
            key: 'id'
        }
    },
    userIds: {
        type: DataTypes.ARRAY(DataTypes.UUID)
    }
};

const options = {
    sequelize,
    modelName: 'UserGroup',
    tableName: 'UsersGroups'
};

export class UserGroupModel extends Model<UserGroupModel> {
    public readonly id?: string;
    public readonly groupId!: string;
    public readonly userIds!: string[];
}

UserGroupModel.init(attributes, options);

UserModel.belongsToMany(GroupModel, { through: UserGroupModel });
GroupModel.belongsToMany(UserModel, { through: UserGroupModel });
