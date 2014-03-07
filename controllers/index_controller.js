'use strict';
var data = require('../json/fake_users.json');

var mongoose = require('mongoose'),
	User = mongoose.model('User');

/* Index page. Also populates db with fake users */
exports.view = function(req, res) {

    if (!req.user) {
        res.render('index', {user: null});
    } else {
        res.render('user', {
            user: JSON.stringify(req.user),
            'current_user': req.user.username
        });
    }
}
