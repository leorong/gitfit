'use strict';
var data = require('../json/fake_users.json');

var mongoose = require('mongoose'),
	User = mongoose.model('User');

/* Login form */
exports.login = function(req, res) {
    res.render('login', {user: req.user ? JSON.stringify(req.user) : null, 
                        message: req.session.messages || [] });
    req.session.messages = [];
};

/* Signup form */

exports.signup = function(req, res) {
  res.render('signup');
};

/* Logout */
exports.signout = function(req, res) {
    req.logout();
    res.redirect('/'); //or Login?
};

/* Create user */
exports.create = function(req, res, next) {
    var userData = req.body;
    console.log(userData);

    User.find({username: userData['username']})
        .exec(function(err, user) {
            if(err) console.log(err);
            if (user) {
                res.render('signup', {message: 'Username already exists.'});
            }
        });

    var newUser = new User(userData);
    newUser['username'] = userData['username'];
    newUser['email'] = userData['email'];
    newUser['password'] = userData['password'];

    console.log(newUser);
    req.logIn(newUser, function(err) {
        if (err) { console.log(err);}
    });

    console.log(req.user);

    newUser.save(afterSaving);

    function afterSaving(err) {
        if (err) {console.log(err); res.send(500);}
        res.send(200);
    }
    // var user = new User({
    //     username: req.params.username,
    //     email: req.params.email,
    //     password: req.params.password
    // });
    // var message = null;
    // //console.log(user);

    // user.provider = 'local';
    // user.save(function(err) {
    //     if (err) {
    //         switch (err.code) {
    //             case 11000:
    //             case 11001:
    //                 message = 'Username already exists';
    //                 break;
    //             default:
    //                 message = 'Please fill all the required fields';
    //         }

    //         return res.render('signup', {
    //             message: message,
    //             user: user
    //         });
    //     }
    //     req.logIn(user, function(err) {
    //         if (err) return next(err);
    //         return res.redirect('/');
    //     });
    // });
};

exports.setup = function(req, res) {
    if (!req.user) {
        console.log('Not logged in');
        res.redirect('/');
    } else if (req.user.activities.length != 0) {
        console.log('Already set up profile');
        res.redirect('/');
    } else {
        console.log('We have a user');
    }



    res.render('profile_setup', {user: JSON.stringify(req.user)}); 
}

exports.addprofile = function(req, res, next) {
    if (!req.user) {
        console.log('Not logged in');
        res.redirect('/');
    } else if (req.user.activities.length != 0) {
        console.log('Already set up profile');
        res.redirect('/');
    } else {
        console.log('We have a user');
    }

    var userProfile = req.body;
    console.log('User Profile to be entered:');
    console.log(userProfile);

    var location = userProfile['city'] + ", " + userProfile['state'];

    var profile = {
        name: {
            first: userProfile['firstName'],
            last: userProfile['lastName'],
        },
        age: userProfile['age'],
        location: location,
        gym: userProfile['gym'],
        about_me: userProfile['about_me'],
        imageURL: userProfile['imageURL'],
        looking: userProfile['looking'],
        activities: userProfile['activities'],
        availability: userProfile['availability']
    }
    console.log(req.user);
    var query = {username: req.user.username};

    User.update(query, profile, function(err, numAffected, raw) {
        if (err) { 
            console.log(err);
            res.send(500);
        } else {
            console.log('The number of updated users was %d', numAffected);
            console.log('The raw response from Mongo was ', raw);
            res.send(200);
        }
    })
    // User.findOneAndUpdate(query, profile, afterUpdating);

    // function afterUpdating(err) {
    //     if (err) {console.log(err); res.send(500);}
    //     res.send(200);
    // }


    // var newUser = new User(userData);
    // newUser['username'] = userData['username'];
    // newUser['email'] = userData['email'];
    // newUser['password'] = userData['password'];

    // console.log(newUser);
    // req.logIn(newUser, function(err) {
    //     if (err) { console.log(err);}
    // });

    // console.log(req.user);

    // newUser.save(afterSaving);

    // function afterSaving(err) {
    //     if (err) {console.log(err); res.send(500);}
    //     res.send(200);
    // }

    //res.render('profile_setup', {user: JSON.stringify(req.user)}); 
}

/* View profiles */

exports.view = function(req, res) {
    // var users = data['users'];
    // var randomIndex = Math.floor(Math.random() * users.length);
    // var randomUser = users[randomIndex];

    if (!req.user) {
        console.log('Not logged in');
        res.redirect('/');
    } else {
        console.log('We have a user');
    }

    var username = req.params.username;

    User.findOne({username: username}, function (err, user) {
        if (err) { 
            console.log("error");
            res.redirect('/');
        } else {
            console.log(req.user);
            if (user) {
                res.render('user', {
                    user: req.user ? JSON.stringify(req.user) : null,
                    'current_user': req.user ? req.user.username : 'null',
                    'name': user.name.full,
                    'username': user.username,
                    'age': user.age,
                    'imageURL': user.imageURL,
                    'location': user.location,
                    'about_me': user.about_me,
                    'activities': user.activities
                }); 
            } else {
                res.render('index', {
                    user: req.user ? JSON.stringify(req.user) : null,
                    'current_user': req.user ? req.user.username : 'null'
                });
            }
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

    if (!req.user) {res.redirect('login');}

    var user = JSON.stringify(req.user);

    var returnObj = data;
    returnObj['user'] = user;

    res.render('buddylist', data);
};


/* Set up Schedule */
exports.schedule_setup = function(req, res) {

    if (!req.user) {
        res.redirect('/');
    }

    var username = req.params.username;

    User.findOne({username: username}, function (err, user) {
        if (err) { 
            console.log("error");
            res.redirect('/');
        } else {
            if (user) {
                res.render('user', {
                    user: req.user ? JSON.stringify(req.user) : null,
                    'current_user': req.user ? req.user.username : 'null',
                    'name': user.name.full,
                    'username': user.username,
                    'age': user.age,
                    'imageURL': user.imageURL,
                    'location': user.location,
                    'about_me': user.about_me,
                    'activities': user.activities
                }); 
            } else {
                res.render('index', {
                    user: req.user ? JSON.stringify(req.user) : null,
                    'current_user': req.user ? req.user.username : 'null'
                });
            }
        }
    });
};

/* Show My Schedule */
exports.schedule = function(req, res) {

};






