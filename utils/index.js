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

exports.encrypt = function(str, secret) {
    var cipher = crypto.createCipher('aes192', secret);
    var enc = cipher.update(str, 'utf8', 'hex');
    enc += cipher.final('hex');
    return enc;
};

exports.decrypt = function (str, secret) {
    var decipher = crypto.createDecipher('aes192', secret);
    var dec = decipher.update(str, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};
