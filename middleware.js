/**
 * Created by SL on 2014/9/13.
 */

module.exports = {
    authUser: function (req, res, next) {
        res.locals.currentUser = req.session.user;
        next();
    }
};