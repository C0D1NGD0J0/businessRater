'use strict';
const mongoose = require('mongoose'),
			Schema = mongoose.Schema,
			bcrypt = require('bcrypt-nodejs'),
			uniqueValidator = require('mongoose-unique-validator');

let UserSchema = new Schema({
	fullname:{
		type: String,
		required: true,
		unique: true
	},
	email:{
		type: String,
		required: true,
		index: true,
		unique: true
	},
	password: String,	
	role: {
		type: String,
		default: ''
	},
	fbID: {
		type: String,
		default: ''
	},
	tokens: [],
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

UserSchema.plugin(uniqueValidator);

mongoose.model('User', UserSchema);