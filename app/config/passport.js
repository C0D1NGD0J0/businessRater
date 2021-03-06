'use strict';
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const FacebookStrategy = require('passport-facebook').Strategy;
const secret = require('../config/secret');

// Stores user id in session
passport.serializeUser((user, done) => {
	done(null, user.id);
});

// Retrieve the stored user in the session and passed to mongoose to find user in DB
passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) =>{
		done(err, user);
	});
});

passport.use('local-signup', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
	},(req, email, pwd, done) =>{
	User.findOne({email: email}, (err, user) =>{
		if(err) return done(err);
		if(user) return done(null, false, req.flash('error', 'User email already exists!.'));
		
		let newuser = new User();
		newuser.fullname = req.body.fullname;
		newuser.email = req.body.email;
		newuser.password = newuser.encryptPwd(req.body.password);

		newuser.save((err) => {
			return done(null, newuser);
		});
	})
}));

passport.use('local-login', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
	},(req, email, pwd, done) => {
	User.findOne({email}, (err, user) =>{
		if(err) return done(err);
		let messages = [];
		
		if(!user || !user.validatePwd(pwd)){
			messages.push('Invalid email/password combination.')
			return done(null, false, req.flash('error', messages))
		};
		return done(null, user);
	});
}));

passport.use(new FacebookStrategy(secret.facebook, (req, token, refreshToken, profile, done) => {
	User.findOne({fbID: profile.id}, (err, user) => {
		if(err) return done(err);
		
		if(user) {
			return done(null, user);
		} else {

			let newuser = new User();
			newuser.fbID = profile.id;
			newuser.fullname = profile.displayName;
			newuser.email = profile._json.email;
			newuser.tokens.push({token});

			newuser.save((err) => {
				return done(null, newuser);
			});
		}
	})
}));