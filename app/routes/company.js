'use strict';

const router = require('express').Router();
const h = require('../config/helper');
const company = require('../controllers/company');

router.get('/', company.index);
router.get('/new', company.new);
router.post('/create', h.validateCompany, company.create);

module.exports = router;