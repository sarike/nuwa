/**
 * @author SL.
 * @description
 * 2014/9/12
 */
'use strict';

var core = require("../../core");

module.exports = {

    homePage: function (req, res) {
        var context = {
            title: "Nuwa 后台管理"
        };
        res.render('index', context);
    },

    loadApplication: function (req, res) {
        var appName = req.param("appName");
        core.applicationManager.loadApplications(appName, function (messages) {
            if (messages) {
                res.render('index', {
                    messages: messages
                });
            } else {
                res.redirect('/admin');
            }
        });
    },

    unloadApplication: function (req, res) {
        var appName = req.param("appName");
        core.applicationManager.unLoadApplications(appName);
        var context = {
            title: "UnLoad Success"
        };
        res.render('index', context)
    },

    reloadApplication: function (req, res) {
        var appName = req.param("appName");
        core.applicationManager.reLoadApplications(appName);
        var context = {
            title: "ReLoad Success"
        };
        res.render('index', context)
    }
};

