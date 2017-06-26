'use strict';
const passport = require('passport');
const passportConfig = require('../config/passport');
const async = require('async');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const mailerSecret = require('../config/mailer');

let user = {
	login: (req, res, next) => {
		let errors = req.flash('error')
		res.render('pages/login', {title: "Login || RateMe", errors});
	},

	signup: (req, res, next) => {
		let errors = req.flash('error');
		res.render('pages/signup', {title: "Signup || RateMe", errors});
	},

	create: passport.authenticate('local-signup', {
		successRedirect: '/dashboard',
		failureRedirect: '/signup',
		failureFlash: true
	}),

	log_In: passport.authenticate('local-login', {
		successRedirect: '/dashboard',
		failureRedirect: '/login',
		failureFlash: true
	}),

	forgot: (req, res, next) => {
		let errors = req.flash('error');
		let info = req.flash('info');
		res.render('pages/password-forgot', {title: "Forgot Password || RateMe", info, errors});
	},

	pwdforgot: (req, res, next) => {
		async.waterfall([
			function(cb){
				crypto.randomBytes(15, (err, buf) => {
					let token = buf.toString('hex');
					cb(err, token);
				});
			},//end

			function(token, cb){
				User.findOne({email: req.body.pwdForgotEmail}, (err, user) => {
					if(!user) {
						req.flash('error', "Email not in database.".toUpperCase());
						return res.redirect('/forgot');
					}

					user.passwordResetToken = token;
					user.passwordResetExpired = Date.now() + 60*60*1000; //token expires in 1hr in milliseconds
					user.save((err) =>{
						cb(err, token, user);
					})
				});
			},//end
			// sending email to user for password reset
			function(token, user, cb){
				let smtpTransport = nodemailer.createTransport({
					service: 'Gmail',
					auth: {
						user: mailerSecret.auth.user,
						pass: mailerSecret.auth.pwd
					}
				});

				let mailOptions = {
					to: user.email,
					from: `RateMe <${mailerSecret.auth.user}>`,
					subject: 'RateMe-App Password Reset Token',
					text: "You requested for password reset.\nPlease click on the link to completed the process: \n\n" + "http://localhost:3000/reset/" + token
				}

				smtpTransport.sendMail(mailOptions, (err, response) => {
					req.flash('info', `Password reset token has been sent to ${user.email}`);
					return cb(err, user);
				});
			}//end
		], 
		(err) => {
			if(err) return next(err);
			res.redirect('/forgot')
		});
	},

	reset: (req, res, next) => {
		User.findOne({passwordResetToken: req.params.token, passwordResetExpired: {$gt: Date.now()}}, (err, user) => {
			if(!user){
				req.flash('error', 'Password reset token is invalid/expired.');
				return res.redirect("/forgot");
			}
			let errors = req.flash('error')
			res.render('pages/reset', {title: "Password Reset || RateMe", errors})
		})
	}
}

module.exports = user;