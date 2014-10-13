/**
 * @author SL.
 * @description
 * 2014/9/7
 */
'use strict';

/**
 *  检查登录信息
 * @param req
 * @param res
 * @param callback 检查结果为已经登录时的回调函数
 */
function checkLogin(req, res, callback) {
    if (!req.session.user) {
        req.session.nextUrl = req.originalUrl;
        res.redirect('/account/login');
    } else {
        callback();
    }
}

exports.loginRequired = function(req, res, next) {
    checkLogin(req, res, next);
};

exports.superLoginRequired = function (req, res, next) {
    checkLogin(req, res, function () {
        if (req.session.user.isSuperAdmin) {
            next();
        } else {
            var err = new Error('Forbidden');
            err.status = 403;
            next(err);
        }
    });
};


exports.adminRequired = function (appName) {
//    checkLogin(req, res, function () {
//        if (req.session.user.managedApps.indexOf(appName) > -1) {
//            next();
//        } else {
//            res.status(403);
//            next();
//        }
//    });
};
