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

    req.logIn(newUser, function(err) {
        if (err) { console.log(err);}
    });

    newUser.save(afterSaving);

    function afterSaving(err) {
        if (err) {console.log(err); res.send(500);}
        res.send(200);
    }
};

exports.setup = function(req, res) {
    if (!req.user) {
        // console.log('Not logged in');
        res.redirect('/');
    } else if (req.user.activities.length != 0) {
        // console.log('Already set up profile');
        res.redirect('/');
    }

    res.render('profile_setup', {user: JSON.stringify(req.user)}); 
}

exports.addprofile = function(req, res, next) {
    if (!req.user) {
        // console.log('Not logged in');
        res.redirect('/');
    } else if (req.user.activities.length != 0) {
        // console.log('Already set up profile');
        res.redirect('/');
    }

    var userProfile = req.body;
    // console.log('User Profile to be entered:');
    // console.log(userProfile);

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
}

exports.basicinfo = function(req, res) {
    if (!req.user) {
        res.redirect('/');
    }

    res.render('profile_setup_basicinfo', {user: JSON.stringify(req.user)}); 
}

exports.addbasicinfo = function(req, res, next) {
    if (!req.user) {
        res.redirect('/');
    }

    var basicinfo = req.body;

    var location = basicinfo['city'] + ", " + basicinfo['state'];

    var profile = {
        name: {
            first: basicinfo['firstName'],
            last: basicinfo['lastName'],
        },
        age: basicinfo['age'],
        location: location,
        about_me: basicinfo['about_me'],
        imageURL: basicinfo['imageURL'],
        looking: basicinfo['looking']
    }

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
}

exports.gymandactivities = function(req, res) {
    if (!req.user) {
        res.redirect('/');
    }

    res.render('profile_setup_gymandactivities', {user: JSON.stringify(req.user)}); 
}

exports.addgymandactivities = function(req, res, next) {
    if (!req.user) {
        res.redirect('/');
    }

    var gymandactivities = req.body;

    var profile = {
        gym: gymandactivities['gym'],
        activities: gymandactivities['activities']
    }

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
}

exports.availability = function(req, res) {
    if (!req.user) {
        res.redirect('/');
    }

    res.render('profile_setup_availability', {user: JSON.stringify(req.user)}); 
}

exports.addavailability = function(req, res, next) {
     if (!req.user) {
        res.redirect('/');
    }

    var availability = req.body;

    var profile = {
        availability: availability['availability']
    }

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
}

/* View own profile */

exports.view = function(req, res) {

    if (!req.user) {
        // console.log('Not logged in');
        res.redirect('/');
    } 

    var username = req.params.username;

    User.findOne({username: username}, function (err, user) {
        if (err) { 
            console.log("error");
            res.redirect('/');
        } else {
            // console.log(req.user);
            if (user) {
                res.render('user', {
                    user: req.user ? JSON.stringify(req.user) : null,
                    'current_user': req.user ? req.user.username : 'null',
                    'name': user.name.full,
                    'username': user.username,
                    'age': user.age,
                    'looking':user.looking,
                    'imageURL': user.imageURL,
                    'location': user.location,
                    'gym': user.gym,
                    'about_me': user.about_me,
                    'activities': user.activities,
                    'availability': user.availability,
                    'schedule': user.schedule
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

/* View other people's profiles */

exports.viewProfile = function(req, res) {

    if (!req.user) {
        console.log('Not logged in');
        res.redirect('/');
    }

    var username = req.params.username;

    User.findOne({username: username}, function (err, user) {
        if (err) { 
            console.log("error");
            res.redirect('/');
        } else {
            // console.log(req.user);
            if (user) {
                res.render('profile', {
                    user: req.user ? JSON.stringify(req.user) : null,
                    'current_user': req.user ? req.user.username : 'null',
                    'name': user.name.full,
                    'username': user.username,
                    'age': user.age,
                    'looking':user.looking,
                    'imageURL': user.imageURL,
                    'location': user.location,
                    'gym': user.gym,
                    'about_me': user.about_me,
                    'activities': user.activities,
                    'availability': user.availability,
                    'schedule': user.schedule
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

/* Profile Edit Calls */

exports.editImageURL = function(req, res, next) {
    if (!req.user) {
        res.redirect('/');
    }

    var json = req.body;
    var url = json['imageURL'];

    var query = {username: req.user.username};
    User.update(
        query, 
        { $set: { imageURL: url } }, 
        function(err, numAffected, raw) {
            if (err) { 
                console.log(err);
                res.send(500);
            } else {
                console.log('The number of updated users was %d', numAffected);
                console.log('The raw response from Mongo was ', raw);
                res.send(200);
            }
        }
    );
}

exports.editBasicInfo = function(req, res, next) {

}

exports.editActivities = function(req, res, next) {

}

exports.editAvailability = function(req, res, next) {

}

/* Show Buddy List */
exports.buddylist = function(req, res) {
    if (!req.user) {res.redirect('login');}
    
    var user = req.user;
   
    res.render('buddylist', {'friends': user.friends});
};


/* Unfriend a Buddy */
exports.unfriend = function(req, res) {
    if(!req.user) {res.redirect('login');}

    var username = req.params.username;

    User
        .update({}, {$pull : { "friends" : { "username":username} } }, false, false )
        .where({"username":req.user.username})
        .remove()
        .exec(afterRemoving);
    
    function afterRemoving(err) {
        if(err) {console.log(err); res.send(500)};
        console.log("removed buddy");
        res.redirect('/buddylist');
    }
};

/* Set up Schedule */
exports.schedule_setup = function(req, res) {

    if (!req.user) {res.redirect('login');}

    var activities = req.user.activities;

    res.render('schedule_setup', {
        user: req.user ? JSON.stringify(req.user) : null,
        'current_user': req.user ? req.user.username : 'null',
        "activities" : activities
    });
    
};


/* Show My Schedule */
exports.schedule = function(req, res) {
    if (!req.user) {res.redirect('login');}

    var schedule = req.user.schedule;
    var activities = req.user.activities; 

    res.render('schedule', {
        user: req.user ? JSON.stringify(req.user) : null,
        'current_user': req.user ? req.user.username : 'null',
        "schedule" : schedule,
        "activities": activities
    });
};



exports.addschedule = function(req, res, next) {
    if (!req.user) {
        // console.log('Not logged in');
        res.redirect('/');
    }

    var scheduleEntry = req.body;
    var day = scheduleEntry['day'];

    var entry = {
        "activity": scheduleEntry['activity'],
        "startTime": scheduleEntry['startTime'],
        "endTime": scheduleEntry['endTime']
    };

    var schedule = {
        monday: req.user.schedule.monday,
        tuesday: req.user.schedule.tuesday,
        wednesday: req.user.schedule.wednesday,
        thursday: req.user.schedule.thursday,
        friday: req.user.schedule.friday,
        saturday: req.user.schedule.saturday,
        sunday: req.user.schedule.sunday
    }
    schedule[day].push(entry);

    var query = {username: req.user.username};
    User.update(
        query, 
        { $set: { schedule: schedule } }, 
        function(err, numAffected, raw) {
            if (err) { 
                console.log(err);
                res.send(500);
            } else {
                console.log('The number of updated users was %d', numAffected);
                console.log('The raw response from Mongo was ', raw);
                res.send(200);
            }
        }
    );
}