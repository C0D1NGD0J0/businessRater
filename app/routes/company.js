'use strict';

const router = require('express').Router();
const h = require('../config/helper');
const company = require('../controllers/company');

router.get('/new', company.new);
// router.post('/upload', company.upload);

module.exports = router;