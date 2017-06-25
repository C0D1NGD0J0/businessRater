'use strict';

const router = require('express').Router();
const home = require('../controllers/home');
const user = require('../controllers/user');
const h = require('../config/helper');

router.get('/', home.index);
router.get('/dashboard', home.dashboard);
router.get('/login', user.login);
router.get('/signup', user.signup);
router.get('/pwdforgot', user.pwdforgot);

router.post('/signup', h.validateSignup, user.create);
router.post('/login', h.validateLogin, user.log_In);

module.exports = router;