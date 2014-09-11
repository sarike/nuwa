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

mongoose.model('User', UserSchema);