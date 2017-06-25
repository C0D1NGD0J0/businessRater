'use strict';
const mongoose = require('mongoose'),
			Schema = mongoose.Schema,
			bcrypt = require('bcrypt-nodejs');

let UserSchema = new Schema({
	fullname:{
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true
	},
	password: String,	
	role: {
		type: String,
		default: ''
	},
	company:{
		name: {
			type: String,
			default: ''
		},
		image: {type: String, default: ''}
	},
	passwordResetToken: {type: String, dafault: ''},
	passwordResetExpired: {type: Date, default: Date.now}
});

UserSchema.methods.encryptPwd = function(pwd){
	return bcrypt.hashSync(pwd, bcrypt.genSaltSync(10), null);
}

UserSchema.methods.validatePwd = function(pwd){
	return bcrypt.compareSync(pwd, this.password);
}

mongoose.model('User', UserSchema);