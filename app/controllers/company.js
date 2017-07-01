'use strict';

let company = {
	new: (req, res, next) => {
		res.render('company/company', {title: "Company Registration || RateMe"});
	}
}

module.exports = company;