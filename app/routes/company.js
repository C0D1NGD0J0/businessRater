'use strict';

const router = require('express').Router();
const h = require('../config/helper');
const company = require('../controllers/company');

router.get('/new', company.new);

module.exports = router;