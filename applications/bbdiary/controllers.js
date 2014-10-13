/**
 * @author SL.
 * @description
 * 2014/9/12
 */
'use strict';

var core = require("../../core"),
    express = require("express"),
    models = require("./models"),

    BBDiary = models.BBDiary;

module.exports = {

    indexPage: function (req, res) {
        res.render("index");
    },

    homePage: function (req, res, next) {
        var babyId = req.param("baby_id");

        if (babyId.length !== 24) {
            return next(); // 404
        }

        BBDiary.findById(babyId, function (error, bbdiary) {
            if (error) return next(error);

            if (bbdiary) {
                res.render("home", {
                    bbdiary: bbdiary
                });
            } else {
                next(); // 404
            }
        });
    },

    adminPage: function (req, res, next) {
        var babyId = req.param("baby_id");

        res.render("admin");
    },

    openAction: function (req, res) {
        BBDiary.openBBDiary(req.session.user.email, function (error, isHaveOpened, bbdiary) {
            if (error) return next(error);
            var context = {
                isHaveOpened: isHaveOpened,
                bbdiary: bbdiary
            };
            res.render("open", context);
        });
    }
};

