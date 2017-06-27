'use strict';

let home = {
	index: (req, res, next) => {
		if(req.user || req.session.cookie.originalMaxAge != null){
			res.render('pages/dashboard', {title: "Dashboard || RateMe"});
		} else {
			res.render('pages/index', {title: "Home || RateMe"});
		}
	},

	// dashboard: (req, res, next) => {
	// }
}

module.exports = home;