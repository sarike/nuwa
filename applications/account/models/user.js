/**
 * @author SL.
 * @description
 * 2014/9/11
 */
'use strict';

var mongoose = require('mongoose'),
    utils = require('../../../utils');

var UserSchema = mongoose.Schema({
    email: String,
    password: String,
    nickname: String,
    join_date: { type: Date, default: Date.now },
    last_login_date: { type: Date, default: Date.now }
});

UserSchema.methods.setPassword = function (str) {
    if (!str) return;
    this.password = utils.sha1(str);
};

// static methods

UserSchema.statics.createUser = function (email, passWord, callback) {
    var User = this;
    this.findOne({email: email}, function (error, user) {

        if (error) {
            callback(error);
            return;
        }

        if (!user) {
            var userIns = new User({
                email: email
            });
            userIns.setPassword(passWord);
            userIns.save(function (error, user) {
                if (error) {
                    callback(error);
                    return;
                }
                callback(null, null, user);
            });
        } else {
            callback(null, "用户已经存在");
        }
    });

};

UserSchema.statics.validateUser = function (email, passWord, callback) {
    if (!email || !passWord) {
        callback(null);
        return;
    }
    this.findOne({email: email, password: utils.sha1(passWord)}, function (error, user) {
        if (error) {
            callback(null);
            return;
        }
        callback(user);
    });
};

mongoose.model('User', UserSchema);