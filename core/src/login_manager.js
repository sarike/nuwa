/**
 * @author SL.
 * @description
 * 2014/9/7
 */
'use strict';

exports.loginRequired = function(req, res, next) {
    if (!req.session.user) {
        req.session.nextUrl = req.originalUrl;
        res.redirect('/account/login');
    } else {
        next();
    }
};
