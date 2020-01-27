import { Sequelize } from 'sequelize';

enum Dialect {
    POSTGRES = 'postgres'
}

const database = {
    name: 'sraricxe',
    password: '1o2ITIVhV9sboiAg8Hjqb9ztUw7gpezH',
    username: 'sraricxe',
    dialect: Dialect.POSTGRES,
    host: 'packy.db.elephantsql.com',
    port: 5432
};

export const sequelize = new Sequelize(database.name, database.username, database.password, {
    dialect: database.dialect,
    host: database.host,
    port: database.port,
    define: { timestamps: false }
});
