/**
 * @author Sarike.
 * @description
 * 2014/9/12
 */
'use strict';

var express = require('express'),
    controllers = require('./controllers'),
    core = require('../../core'),
    loginManager = core.loginManager,
    router = express.Router();

router.get('/', controllers.homePage);

module.exports = router;

