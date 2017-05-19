/**
 * Created by Valentino on 13.12.2015..
 */
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var passport = require('passport');
/*var mongoStore = require('mongo-store')({
        session: session
});*/
var config = require('../../config/config');
var path = require('path');

module.exports = function(app, db){
    require('../models/user.server.model');

    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.set('jwtSecret', config.jwtSecret);


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(morgan('dev'));

    app.use(cookieParser());

    app.use(session({
        saveUninitialized: false,
        resave: false,
        secret: config.sessionSecret
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(passport.session());
};