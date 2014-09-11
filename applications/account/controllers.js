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
    var nextUrl = req.query.next;
    if (nextUrl) {
        req.session.nextUrl = nextUrl;
    }
    res.render('login');
};

exports.doLogin = function (req, res) {
    var email = req.body.email.trim(),
        passWord = req.body.passWord.trim();

    User.validateUser(email, passWord, function(user) {
        if (user) {
            req.session.user = user;
            res.redirect(req.session.nextUrl || '/admin')
        } else {
            res.render('login', {
                error: "用户名或者密码不正确",
                email: email
            })
        }
    });
};

exports.registerPage = function (req, res) {
    res.render('register');
};

exports.doRegister = function (req, res, next) {
    var email = req.param('email').trim(),
        passWord = req.param('passWord').trim();

    verifyRegisterInput(email, passWord, function (messages) {
        if (messages) {
            res.render("register", {
                errors: messages,
                email: email,
                passWord: passWord
            })
        } else {
            User.createUser(email, passWord, function(error, message, user) {
                if (error) {
                    return next(error);
                }

                if (message) {
                    res.render('register', {
                        errors: {
                            email: message
                        },
                        email: email
                    });
                    return;
                }
                res.render('register_success', {
                    email: user.email
                });
            });
        }
    });
};

function verifyRegisterInput (email, passWord, callback) {
    var errors = null;

    if (!email) {
        errors = errors || {};
        errors.email = "请填写一个邮箱";
    }
    else if (!validator.isEmail(email)) {
        errors = errors || {};
        errors.email = "请填写正确的邮箱";
    }

    if (!passWord) {
        errors = errors || {};
        errors.passWord = "请设置一个密码";
    }

    callback(errors);
}