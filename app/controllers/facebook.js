'use strict';
const passport = require('passport');
const passportConfig = require('../config/passport');

module.exports = {
	auth: passport.authenticate('facebook'),

	cbAuth: (passport.authenticate('facebook', {
		successRedirect: '/forgot',
		failureRedirect: '/login',
		failureFlash: true
	}))
}