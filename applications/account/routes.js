var express = require('express');
var models = require('./models');
var controllers = require('./controllers');
var router = express.Router();
var User = models.User;

// pages
router.get('/login', controllers.loginPage);
router.get('/register', controllers.registerPage);

// get actions
router.get('/logout', controllers.doLogout);

// post actions
router.post('/login', controllers.doLogin);
router.post('/register', controllers.doRegister);

module.exports = router;
