'use strict';

const mongoose = require('mongoose'),
			Schema = mongoose.Schema;

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

mongoose.model('User', UserSchema);