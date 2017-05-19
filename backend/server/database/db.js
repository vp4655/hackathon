import config from '../config/db.config';
import knex from 'knex';

const database = knex({
    client: 'pg',
    connection: {
        host: config.host,
        port: config.port,
        user: config.username,
        password: config.password,
        database: config.database
    }
});

export default database;
