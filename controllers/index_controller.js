'use strict';

var user_controller = require('./users_controller.js');

var mongoose = require('mongoose'),
	User = mongoose.model('User');

/* Index page. Also populates db with fake users */
exports.view = function(req, res) {

    if (!req.user) {
        res.render('index', {user: null});
    } else {
    	var userProfile = '/user/' + req.user.username;
    	res.redirect(userProfile);
    }
}
