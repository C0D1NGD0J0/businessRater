'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

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

passport.use('local.signup', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
},(req, email, password, done) =>{
	User.findOne({email}, (err, user) =>{
		if(err) return done(err);
		if(user) return done(null, false);
		
		let newuser = new User();
		newuser.fullname = req.body.fullname;
		newuser.email = req.body.email;
		newuser.password = encryptPwd(req.body.password);

		newuser.save((err) => {
			return done(null newuser);
		});
	})
}));















