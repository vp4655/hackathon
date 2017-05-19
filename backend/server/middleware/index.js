import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import session from 'express-session';

export const configureMiddleware = ({app, config, db}) => {
    app.use(bodyParser.json({
        limit: config.server.bodyLimit
    }));
    app.use(bodyParser.urlencoded({extended: false}));


    // requrest logger
    app.use(morgan('dev'));

    app.use(cookieParser());

    app.use(session({
        saveUninitialized: false,
        resave: false,
        secret: config.server.sessionSecret
    }));

    // apply additional middleware here
};
