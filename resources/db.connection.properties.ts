import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

type Config = any;

const { DB_NAME, DB_PASSWORD, DB_USERNAME, DB_DIALECT, DB_HOST, DB_PORT }: Config = process.env;

export const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    dialect: DB_DIALECT,
    host: DB_HOST,
    port: DB_PORT,
    define: { timestamps: false }
});
