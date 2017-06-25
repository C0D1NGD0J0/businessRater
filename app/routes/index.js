'use strict';

const router = require('express').Router();
const home = require('../controllers/home');
const user = require('../controllers/user');
const h = require('../config/helper');

router.get('/', home.index);
router.get('/login', user.login);
router.get('/signup', user.signup);
router.get('/pwdforgot', user.pwdforgot);
router.post('/signup', h.validate, user.create);


module.exports = router;