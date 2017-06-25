'use strict';
const passport = require('passport');
const passportConfig = require('../config/passport');

let user = {
	login: (req, res, next) => {
		res.render('pages/login', {title: "Login || RateMe"});
	},

	signup: (req, res, next) => {
		let errors = req.flash('error')
		res.render('pages/signup', {title: "Signup || RateMe", errors});
	},

	create: passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash: true
	}),

	pwdforgot: (req, res, next) => {
		res.render('pages/password-forgot', {title: "Forgot Password || RateMe"});
	}
}

module.exports = user;