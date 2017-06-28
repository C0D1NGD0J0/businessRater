'use strict';
const passport = require('passport');
const passportConfig = require('../config/passport');

module.exports = {
	auth: passport.authenticate('facebook', {scope: 'email'}),

	cbAuth: (passport.authenticate('facebook', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	}))
}