/**
 * @author Sarike.
 * @description
 * 2014/9/6
 */
'use strict';

var express = require('express');
var router = express.Router();
var core = require("../../../core");

var loginManager = core.loginManager;

/* GET home page. */
router.get('/', loginManager.loginRequired, function(req, res) {
    var context = {
        title: "Nuwa Admin"
    };
    res.render('index', context);
});

module.exports = router;