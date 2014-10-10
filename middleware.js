/**
 * Created by SL on 2014/9/13.
 */

var config = require("./config");

module.exports = {
    authUser: function (req, res, next) {
        res.locals.currentUser = req.session.user;
        next();
    },

    setConfig: function (req, res, next) {
        res.locals.config = {
            debug: config.debug
        };
        next();
    }
};