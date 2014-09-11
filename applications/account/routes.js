var express = require('express');
var models = require('./models');
var controllers = require('./controllers');
var router = express.Router();
var User = models.User;

router.get('/login', controllers.loginPage);
router.post('/login', controllers.doLogin);

router.get('/register', controllers.registerPage);
router.post('/register', controllers.doRegister);

module.exports = router;
