'use strict';

let home = {
	index: (req, res, next) => {
		res.render('pages/index');
	}
}

module.exports = home;