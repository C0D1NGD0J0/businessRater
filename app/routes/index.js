'use strict';

const router = require('express').Router();
const home = require('../controllers/home');
const user = require('../controllers/user');
const h = require('../config/helper');
const fbCntrl = require('../controllers/facebook');

router.get('/', home.index);
router.get('/login', user.login);
router.get('/signup', user.signup);
router.get('/forgot', user.forgot);
router.get('/reset/:token', user.reset);
router.get('/logout', user.logout);
router.get('/auth/facebook', fbCntrl.auth);
router.get('/auth/facebook/callback', fbCntrl.cbAuth);

router.post('/signup', h.validateSignup, user.create);
router.post('/login', h.validateLogin, user.log_In, h.rememberme);
router.post('/pwdforgot', user.pwdforgot)
router.post('/reset/:token', user.pwdreset);

module.exports = router;