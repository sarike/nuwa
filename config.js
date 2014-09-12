/**
 * @author SL.
 * @description
 * 2014/9/12
 */
'use strict';

var debug = true;


var config = {

    debug: debug,

    appPath: __dirname,

    hostName: "localhost",

    // mongodb 配置
    dbName: 'nuwa',
    dbUrl: 'mongodb://127.0.0.1/' + this.dbName,

    session_secret: "nuwa_secret"
};

module.exports = config;

