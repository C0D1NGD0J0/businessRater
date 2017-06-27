'use strict';
const express = require('express'),
			bodyParser = require('body-parser'),
			cookieParser = require('cookie-parser'),
			config = require('./app/config'),
			ejslayout = require('express-ejs-layouts'),
			session = require('express-session'),
			logger = require('morgan'),
			mongoose = require('mongoose'),
			localDB = require('./app/db'),
			MongoStore = require('connect-mongo')(session),
			passport = require('passport'),
			flash = require('connect-flash'),
			validator = require('express-validator'),
			port = (process.env.PORT || 3000),
			app = express();

// MIDDLEWARE
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(validator());

// SESSION MIDDLEWARE
app.use(session({
	secret: config.secret,
	resave: false,
	saveUninitialized: false,
	store: new MongoStore({url: 'mongodb://localhost:27017/rateme-app', autoReconnect: true})
}));

// FLASH MIDDLEWARE (must do added after session config)
app.use(flash());
// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){ //able to access logged-in user on every request
	res.locals.user = req.user;
	next();
});

require('./app/config/mailer');

// TEMPLATE ENGINE
app.set('view engine', 'ejs');
app.use(ejslayout);
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// MODELS
require('./app/models/user');

// ROUTES
app.use('/', require('./app/routes/index'));

// SERVER
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});