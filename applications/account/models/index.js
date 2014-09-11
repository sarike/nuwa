var mongoose = require('mongoose');

// models
require('./user');

exports.User = mongoose.model('User');