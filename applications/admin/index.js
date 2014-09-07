var express = require('express');
var routes = require('./routes');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', routes.homeRouter);
app.use('/application', routes.appManageRouter);

module.exports = app;
