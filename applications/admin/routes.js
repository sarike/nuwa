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

router.get('/', loginManager.loginRequired, controllers.homePage);

router.post('/application/load', loginManager.loginRequired, controllers.loadApplication);
router.post('/application/unload', loginManager.loginRequired, controllers.unloadApplication);
router.post('/application/reload', loginManager.loginRequired, controllers.reloadApplication);

module.exports = router;

