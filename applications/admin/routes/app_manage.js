/**
 * @author SL.
 * @description
 * 2014/9/6
 */
'use strict';

var express = require('express');
var router = express.Router();
var core = require("../../../core");

router.post("/load", function (req, res) {
    var appName = req.param("app_name");
    core.applicationManager.loadApplications(appName);
    var context = {
        title: "Load Success"
    };
    res.render('index', context)
});

router.post("/unload", function (req, res) {
    var appName = req.param("app_name");
    core.applicationManager.unLoadApplications(appName);
    var context = {
        title: "UnLoad Success"
    };
    res.render('index', context)
});

router.post("/reload", function (req, res) {
    var appName = req.param("app_name");
    core.applicationManager.reLoadApplications(appName);
    var context = {
        title: "ReLoad Success"
    };
    res.render('index', context)
});

module.exports = router;

