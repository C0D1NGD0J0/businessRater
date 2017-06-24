'use strict';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
let db = 'mongodb://localhost:27017/rateme-app';

mongoose.connect(db);
mongoose.connection.on('open', (err) => {
	if(err){
		console.log("Mongoose connection error occured ", err);
	} else {
		console.log('Connected to Database');
	}
});

module.exports = {localDB: mongoose, db};