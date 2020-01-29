import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../../resources';
import { Permission } from '../permission';

const attributes = {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    permission: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    }
};

const options = { sequelize, modelName: 'Group', tableName: 'Groups' };

export class GroupModel extends Model {
    public readonly id?: string;
    public name!: string;
    public permissions!: Permission[];
}

GroupModel.init(attributes, options);
