/**
 * @author SL.
 * @description
 * 2014/9/11
 */
'use strict';

var crypto = require("crypto");

function cryptoHash(str, method) {
    var sum = crypto.createHash(method);
    sum.update(str);
    str = sum.digest('hex');
    return str;
}

exports.md5 = function(str) {
    return cryptoHash(str, "md5");
};

exports.sha1 = function (str) {
    return cryptoHash(str, "sha1");
};