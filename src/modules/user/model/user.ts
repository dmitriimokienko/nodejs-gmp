import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../../../../resources';

// export const User = sequelize.define('user', {
//     id: {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         // autoIncrement: true,
//         primaryKey: true,
//         allowNull: false
//     },
//     login: {
//         type: DataTypes.STRING(50),
//         allowNull: false
//     },
//     password: {
//         type: DataTypes.STRING(130),
//         allowNull: false
//     },
//     age: {
//         type: DataTypes.INTEGER,
//         allowNull: true
//     }
// });

const attributes = {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    login: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(130),
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        defaultValue: null,
        allowNull: true,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    }
};

const options = {sequelize, modelName: 'user'};

export class User extends Model {
    public readonly id?: string;
    public login!: string;
    public password?: string;
    public age?: number | null;
    public isDeleted?: boolean;
}

User.init(attributes, options);
