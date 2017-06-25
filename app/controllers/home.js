'use strict';

let home = {
	index: (req, res, next) => {
		res.render('pages/index', {title: "Home || RateMe"});
	},

	dashboard: (req, res, next) => {
		res.render('pages/dashboard', {title: "Dashboard || RateMe"});
	}
}

module.exports = home;