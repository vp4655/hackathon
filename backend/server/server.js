import express from 'express';
import http from 'http';
import config from './config/config';
import {configureMiddleware} from './middleware';
import {route} from './router';
import logger from './logger';

let app = express();
app.server = http.Server(app);

configureMiddleware({app, config});

route({app, config});

app.server.listen(config.server.PORT);
logger.success('Server listening on port ' + config.server.PORT);
