'use strict';
const express = require('express'),
			bodyParser = require('body-parser'),
			cookieParser = require('cookie-parser'),
			ejslayout = require('express-ejs-layouts'),
			session = require('express-session'),
			logger = require('morgan'),
			port = (process.env.PORT || 3000),
			app = express();

// MIDDLEWARE
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// TEMPLATE ENGINE
app.set('view engine', 'ejs');
app.use(ejslayout);
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// SERVER
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});