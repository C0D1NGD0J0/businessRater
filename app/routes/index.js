'use strict';

const router = require('express').Router();
const home = require('../controllers/home');

router.get('/', home.index);

module.exports = router;