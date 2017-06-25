'use strict';

let home = {
	index: (req, res, next) => {
		res.render('pages/index', {title: "Home || RateMe"});
	}
}

module.exports = home;