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

/* View profiles */

exports.viewProfile = function(req, res) {
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
                res.render('profile', {
                    user: req.user ? JSON.stringify(req.user) : null,
                    'current_user': req.user ? req.user.username : 'null',
                    'name': user.name.full,
                    'username': user.username,
                    'age': user.age,
                    'imageURL': user.imageURL,
                    'location': user.location,
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

/* Show Buddy List */
exports.buddylist = function(req, res) {
    if (!req.user) {res.redirect('login');}
    
    var user = req.user;
   /*
    var friends = [];

    for(var i = 0; i < user.friends.length; i++) {
        User
            .find({"username": user.friends[i]})
            .exec(function(err, user) {
                if(err) {console.log(err); res.send(500);}
            
                var temp = function() {
                    var u = user;
                    return function(){return u};
                }();
                
                friends.push(user);
            });
    }
    console.log(friends);

    */
    res.render('buddylist', {'friends': user.friends});
};

exports.findbuddy = function(req, res) {

    if (!req.user) {res.redirect('login');}

    //var user = JSON.stringify(req.user);
    console.log('User info');
    console.log(req.user.gym);
    console.log(req.user);
    User.find({gym: req.user.gym}).exec(sortUsers);

    function sortUsers(err, buddies) {
        //var scoresObj = {};
        var returnList = [];
        var user = req.user;
        if (user) {
            console.log("Current user is ", user.username);
        } else {
            console.log("Did not pass user");
        }

        if (buddies) {
            console.log("Buddies: ");
            console.log(buddies);
        } else {
            console.log("Did not pass buddies");
        }

        for (var i = 0; i < buddies.length; i++) {
            var score = 0;

            var buddy = buddies[i];
            var buddyActivities = buddy.activities;

            var userActivities = user.activities;

            if (userActivities.length < buddyActivities) {
                var shorter = userActivities;
                var longer = buddyActivities;
            } else {
                var shorter = buddyActivities;
                var longer = userActivities;
            }

            var activityMultiplier = 0;

            for (var j = 0; j < shorter.length; j++) {
                var exercise = shorter[j];
                if (longer.indexOf(exercise) > -1) {
                    activityMultiplier += 1;
                }
            }

            var buddyAvailability = buddy.availability;
            var userAvailability = user.availability;

            var availabilityMultiplier = getOverlap(userAvailability, buddyAvailability);

            score = activityMultiplier * availabilityMultiplier;

            if (user.username != buddy.username) {
                returnList.push({
                    'buddy': buddy,
                    'score': score
                });
            }
            
        }

        returnList.sort(function (a,b) {
            return (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0);
        });

        res.render('findbuddy', {
            user: req.user ? JSON.stringify(req.user) : null,
            'current_user': req.user ? req.user.username : 'null',
            'buddies': returnList
        });
    }

    function getOverlap(userAvailability, buddyAvailability) {
        var multiplier = 1;
        //var dayOverlap = 0;
        //var timeOverlap = 0;

        if (userAvailability.monday.morning && buddyAvailability.monday.morning) {multiplier += 1;}
        if (userAvailability.monday.afternoon && buddyAvailability.monday.afternoon) {multiplier += 1;}
        if (userAvailability.monday.evening && buddyAvailability.monday.evening) {multiplier += 1;}
        
        if (userAvailability.tuesday.morning && buddyAvailability.tuesday.morning) {multiplier += 1;}
        if (userAvailability.tuesday.afternoon && buddyAvailability.tuesday.afternoon) {multiplier += 1;}
        if (userAvailability.tuesday.evening && buddyAvailability.tuesday.evening) {multiplier += 1;}

        if (userAvailability.wednesday.morning && buddyAvailability.wednesday.morning) {multiplier += 1;}
        if (userAvailability.wednesday.afternoon && buddyAvailability.wednesday.afternoon) {multiplier += 1;}
        if (userAvailability.wednesday.evening && buddyAvailability.wednesday.evening) {multiplier += 1;}

        if (userAvailability.thursday.morning && buddyAvailability.thursday.morning) {multiplier += 1;}
        if (userAvailability.thursday.afternoon && buddyAvailability.thursday.afternoon) {multiplier += 1;}
        if (userAvailability.thursday.evening && buddyAvailability.thursday.evening) {multiplier += 1;}

        if (userAvailability.friday.morning && buddyAvailability.friday.morning) {multiplier += 1;}
        if (userAvailability.friday.afternoon && buddyAvailability.friday.afternoon) {multiplier += 1;}
        if (userAvailability.friday.evening && buddyAvailability.friday.evening) {multiplier += 1;}

        if (userAvailability.saturday.morning && buddyAvailability.saturday.morning) {multiplier += 1;}
        if (userAvailability.saturday.afternoon && buddyAvailability.saturday.afternoon) {multiplier += 1;}
        if (userAvailability.saturday.evening && buddyAvailability.saturday.evening) {multiplier += 1;}

        if (userAvailability.sunday.morning && buddyAvailability.sunday.morning) {multiplier += 1;}
        if (userAvailability.sunday.afternoon && buddyAvailability.sunday.afternoon) {multiplier += 1;}
        if (userAvailability.sunday.evening && buddyAvailability.sunday.evening) {multiplier += 1;}

        // console.log("User avail length is, ", userAvailability.length);
        // console.log("buddy avail length is, ", buddyAvailability.length);

        // for (var day = 0; day < 7; day++) {
        //     console.log(userAvailability[day]);
        //     if (userAvailability[day]['morning'] == buddyAvailability[day]['morning']) {
        //         multiplier += 1;
        //         console.log("Upped morning multiplier");
        //     }
        //     if (userAvailability[day]['afternoon'] == buddyAvailability[day]['afternoon']) {
        //         multiplier += 1;
        //         console.log("Upped afternoon multiplier");
        //     }
        //     if (userAvailability[day]['evening'] == buddyAvailability[day]['evening']) {
        //         multiplier += 1;
        //         console.log("Upped evening multiplier");
        //     }
        // }

        return multiplier;
    }
};


/* Unfriend a Buddy */
exports.unfriend = function(req, res) {
    if(!req.user) {res.redirect('login');}

    var username = req.params.username;
    console.log(username);
    console.log(req.user.username);
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

    // console.log(req.user);
    // console.log(req.user.schedule);

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
        console.log('Not logged in');
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
    console.log(schedule);
    schedule[day].push(entry);
    console.log(schedule);

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