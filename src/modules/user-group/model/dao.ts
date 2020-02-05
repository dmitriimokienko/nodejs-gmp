import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../../resources';
import { UserModel } from '../../user/model';
import { GroupModel } from '../../group/model';

const attributes = {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    userId: {
        type: DataTypes.UUID,
        validate: { isUUID: 4 },
        references: {
            model: UserModel,
            key: 'id'
        }
    },
    groupId: {
        type: DataTypes.UUID,
        validate: { isUUID: 4 },
        references: {
            model: GroupModel,
            key: 'id'
        }
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
    public readonly userId!: string;
}

UserGroupModel.init(attributes, options);
