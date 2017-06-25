'use strict';

let user = {
	login: (req, res, next) => {
		res.render('pages/login', {title: "Login || RateMe"});
	},

	signup: (req, res, next) => {
		res.render('pages/signup', {title: "Signup || RateMe"});
	},

	pwdreset: (req, res, next) => {
		res.render('pages/password-forgot', {title: "Forgot Password || RateMe"});
	}
}

module.exports = user;