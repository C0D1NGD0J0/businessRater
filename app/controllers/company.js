'use strict';
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const Company = mongoose.model('Company');

let company = {
	index: (req, res, next) => {
		Company.find({}, (err, companies) => {
			res.render('company/companies', {title: 'All Companies || RateMe', companies});
		})
	},

	new: (req, res, next) => {
		let success = req.flash('success');
		res.render('company/company', {title: "Company Registration || RateMe", success});
	},

	create: (req, res, next) => {
		let newCompany = new Company();
		newCompany.name = req.body.company_name;
		newCompany.address = req.body.address;
		newCompany.city = req.body.city;
		newCompany.country = req.body.country;
		newCompany.sector = req.body.sector;
		newCompany.website = req.body.website;

		newCompany.save((err) => {
			if(err) console.log(err);

			console.log(newCompany);
			req.flash('success', 'Company registration was successful.');
			res.redirect('/company/new');
		})
	}
}

module.exports = company;