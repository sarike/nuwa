var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session    = require('express-session');
var MongoStore = require('connect-mongo')(session);
var core = require("./core");
var config = require("./config");
var middleware = require("./middleware");
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nuwa');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var app = express();

app.use(session({
    secret: config.session_secret,
    store: new MongoStore({
        db : config.dbName
    }),
    key: 'sid',
    resave: true,
    saveUninitialized: true
}));

var am = core.applicationManager;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(middleware.authUser);
app.use(middleware.setConfig);

app.use(am.router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


[
    "index",
    "admin",
    "bbdiary",
    "smarthome",
    "account"
]
.forEach(function (appName) {
    am.loadApplications(appName, function (messages) {
        if (messages) {
            console.error("Load " + appName + " application Error: ", messages);
        }
    })
});


module.exports = app;
