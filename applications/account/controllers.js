/**
 * @author SL.
 * @description
 * 2014/9/11
 */
'use strict';

var validator = require('validator'),
    models = require('./models');

var User = models.User;

exports.loginPage = function (req, res) {
    res.render('login');
};

exports.doLogin = function (req, res, next) {
    res.json({
        name: "sunlei",
        age: 26
    });
};

exports.registerPage = function (req, res) {
    res.render('register');
};

exports.doRegister = function (req, res, next) {
    var userName = req.param('userName').trim(),
        passWord = req.param('passWord').trim();

    verifyRegisterInput(userName, passWord, function (errors) {
        if (errors) {
            res.render("register", {
                errors: errors,
                userName: userName,
                passWord: passWord
            })
        } else {
            var user = new User({
                username: userName
            });
            user.setPassword(passWord);
            user.save(function (error) {
                if (error) {
                    next(error);
                }
                res.render('register_success', {
                    userName: userName
                });
            });
        }
    });
};

function verifyRegisterInput (userName, passWord, callback) {
    var errors = null;

    if (!userName) {
        errors = errors || {};
        errors.userName = "请填写一个邮箱";
    }
    else if (!validator.isEmail(userName)) {
        errors = errors || {};
        errors.userName = "请填写正确的邮箱";
    }

    if (!passWord) {
        errors = errors || {};
        errors.passWord = "请设置一个密码";
    }

    callback(errors);
}