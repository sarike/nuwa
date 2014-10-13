/**
 * @author Sarike.
 * @description
 * 2014/9/12
 */
'use strict';

var express = require('express'),
    controllers = require('./controllers'),
    core = require('../../core'),
    loginManager = core.loginManager,
    router = express.Router();

var models = require('./models'),
    BBDiary = models.BBDiary;

var adminRequired = function (req, res, next) {
    var babyId = req.param("baby_id"),
        err = null;

    if (babyId.length !== 24) {
        return res.status(404).end();
    }

    BBDiary.findById(babyId, function (error, bbdiary) {
        if (error) return next(error); // 500
        if (!bbdiary) return res.status(404).end();

        if (bbdiary.adminList.indexOf(req.session.user.email) > -1) {
            req.bbdiary = bbdiary;
            next();
        } else {
            err = new Error('Forbidden');
            err.status = 403;
            next(err);
        }
    });

};

router.get('/', controllers.indexPage);
router.get('/open', loginManager.loginRequired, controllers.openAction);
router.get('/admin/:baby_id', loginManager.loginRequired, adminRequired, controllers.adminPage);

router.get('/:baby_id', controllers.homePage);

module.exports = router;

