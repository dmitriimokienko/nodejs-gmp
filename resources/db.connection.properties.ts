import {Sequelize} from 'sequelize';

const database = {
    name: 'sraricxe',
    password: '1o2ITIVhV9sboiAg8Hjqb9ztUw7gpezH',
    username: 'sraricxe',
    dialect: 'postgres',
    host: 'packy.db.elephantsql.com',
    port: 5432,
};

export const sequelize = new Sequelize(
    database.name,
    database.username,
    database.password,
    {
        dialect: 'postgres',
        host: database.host,
        port: database.port,
        define: {timestamps: false}
    }
);

export function dbConnect() {
    sequelize
        .sync()
        .then(result => console.log(result))
        .catch(err => console.error(err));
}