'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let companySchema = new Schema({
	name: {
		type: String,
		required: true
	},
	address: {type: String},
	city: {type: String},
	country: {type: String},
	sector: {type: String},
	website: {type: String},
	image: {type: String},
	employees: [{
		employeeID: {type: String, default: ''},
		employeeName: {type: String, default: ''},
		employeeRole: {type: String}
	}],
	companyRating: [{
		companyName: {type: String, default: ''},
		userName: {type: String, default: ''},
		userRole: {type: String, default: ''},
		companyImage: {type: String, default: ''},
		userRating: {type: Number, default: 0},
		userReview: {type: String, default: ''}
	}],
	
	ratingNumber: [Number],
	ratingSum: {type: Number, default: 0}
});

mongoose.model('Company', companySchema);