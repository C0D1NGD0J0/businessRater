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
			port = (process.env.PORT || 3000),
			app = express();

// MIDDLEWARE
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// SESSION MIDDLEWARE
app.use(session({
	secret: config.secret,
	resave: false,
	saveUninitialized: false,
	store: new MongoStore({url: 'mongodb://localhost:27017/rateme-app', autoReconnect: true})
}));

// TEMPLATE ENGINE
app.set('view engine', 'ejs');
app.use(ejslayout);
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// ROUTES
app.use('/', require('./app/routes/index'));

// SERVER
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});