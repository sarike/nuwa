var express = require('express');
var routes = require('./routes');
var path = require('path');

var app = express();

var BASE_PATH = __dirname;
app.use(require('less-middleware')(path.join(BASE_PATH, 'public')));
app.use(express.static(path.join(BASE_PATH, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/', routes);

module.exports = app;
