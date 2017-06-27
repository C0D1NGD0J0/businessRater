'use strict';

module.exports = {
	validateSignup: (req, res, next) => {
		req.checkBody('fullname', 'Fullname is required').notEmpty();
		req.checkBody('fullname', 'Fullname must be greater than 5 characters').isLength({min: 5});
		req.checkBody('email', 'Email is required').notEmpty();
		req.checkBody('email', 'Email is invalid').isEmail();
		req.checkBody('password', 'Password is required').notEmpty();
		req.checkBody('password', 'Password must be greater than 5 characters').isLength({min: 5});
		req.check('password', 'Password must contain at least 1 number.').matches(/^(?=.*\d)(?=.*[a-z])[0-9a-z]{5,}$/, 'i');

		let errors = req.validationErrors();
		if(errors){
			let messages = [];
			errors.forEach((err) => {
				messages.push(err.msg);
			});
			req.flash('error', messages);
			res.redirect('/signup');
		} else {
			return next();
		}
	},

	validateLogin: (req, res, next) => {
		req.checkBody('email', 'Email is required').notEmpty();
		req.checkBody('email', 'Email is invalid').isEmail();
		req.checkBody('password', 'Password is required').notEmpty();
		req.checkBody('password', 'Password must be greater than 5 characters').isLength({min: 5});
		req.check('password', 'Password must contain at least 1 number.').matches(/^(?=.*\d)(?=.*[a-z])[0-9a-z]{5,}$/, 'i');

		let errors = req.validationErrors();
		if(errors){
			let messages = [];
			errors.forEach((err) => {
				messages.push(err.msg);
			});
			req.flash('error', messages);
			res.redirect('/login');
		} else {
			return next();
		}
	},

	validatePassword: (req, res, next) => {
		req.checkBody('password', 'Password is required').notEmpty();
		req.checkBody('password', 'Password must be greater than 5 characters').isLength({min: 5});
		req.check('password', 'Password must contain at least 1 number.').matches(/^(?=.*\d)(?=.*[a-z])[0-9a-z]{5,}$/, 'i');
	},

	rememberme: (req, res) => {
		// remember me feature when trying to log-in user
		if(req.body.rememberme){
			req.session.cookie.maxAge = 30*26*60*60*1000; //setting maxAge for cookie to 30days
		} else {
			req.session.cookie.expires = null;
		}
		res.redirect('/dashboard');
	}
}