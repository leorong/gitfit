'use strict';
var data = require('../json/fake_users.json');

var mongoose = require('mongoose'),
	User = mongoose.model('User');

/* Login form */
exports.login = function(req, res) {
    res.render('login');
};

/* Signup form */

exports.signup = function(req, res) {
  res.render('signup', {user: new User()});
};

/* Logout */
exports.signout = function(req, res) {
    req.logout();
    res.redirect('/'); //or Login?
};

/* New session */
exports.session = function(req, res) {
    res.redirect('/')
}

/* Create user */
exports.create = function(req, res, next) {
    var user = new User(req.body);
    var message = null;

    user.provider = 'local';
    user.save(function(err) {
        if (err) {
            switch (err.code) {
                case 11000:
                case 11001:
                    message = 'Username already exists';
                    break;
                default:
                    message = 'Please fill all the required fields';
            }

            return res.render('users/signup', {
                message: message,
                user: user
            });
        }
        req.logIn(user, function(err) {
            if (err) return next(err);
            return res.redirect('/');
        });
    });
};

/* View profiles */

exports.view = function(req, res) {
    // var users = data['users'];
    // var randomIndex = Math.floor(Math.random() * users.length);
    // var randomUser = users[randomIndex];
    var username = req.params.username;

    User.findOne({username: username}, function (err, user) {
        if (err) { 
            console.log("error");
            res.render('index');
        } else {
            res.render('user', {
                'name': user.name.full,
                'age': user.age,
                'imageURL': user.imageURL,
                'location': user.location,
                'about_me': user.about_me,
                'activities': user.activities
            });
        }
    });

}

/* Show Buddy List */
exports.buddylist = function(req, res) {
    // User.find(function (err, users) {
    //     if (err) {
    //         console.log("error");
    //         res.render('index');
    //     } else {
    //         res.render('buddylist', users)
    //     }
    // });
    res.render('buddylist', data);
};







