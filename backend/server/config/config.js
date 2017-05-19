import db from './db.config.js';

const config = {
    server: {
        PORT: 5000,
        bodyLimit: '100kb',
        db: db,
        sessionSecret: 'personaltrainer',
        sessionCollection: 'session',
        jwtSecret: 'personaltrainer'
    }
};

export default config;
