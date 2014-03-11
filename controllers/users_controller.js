'use strict';
var data = require('../json/fake_users.json');

var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Friend = mongoose.model('Friend');

/* Check if form entry is more than just whitespace */
var isValid = function isValid(str) {
    var re = new RegExp("\\S+");
    var match = re.exec(str);
    return match != null;
}

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
    res.redirect('/');
};

/* Create user */
exports.create = function(req, res, next) {
    if (isValid(req.body.username) && isValid(req.body.email) && isValid(req.body.password) && isValid(req.body.re_password)) {
        if (req.body.password !== req.body.re_password) {
        res.render('signup', {message: 'Password and confirmation do not match.', username: req.body.username, email: req.body.email});
        } else {



        User.find({username: req.body.username})
            .exec(function(err, user) {
                if(err) {console.log(err); res.send(500);}

                if (typeof user !== 'undefined' && user.length > 0) {
                    res.render('signup', {message: 'Username already exists.', username: req.body.username, email: req.body.email});
                } else {
                    var newUser = new User();
                    newUser['username'] = req.body.username;
                    newUser['email'] = req.body.email;
                    newUser['password'] = req.body.password;

                    req.logIn(newUser, function(err) {
                        if (err) { console.log(err);}
                    });

                    newUser.save(afterSaving);
                }
            });
        }
    } else {
        res.render('signup', {message: 'Please fill in all fields.', username: req.body.username, email: req.body.email});
    }
    

    function afterSaving(err) {
        if (err) {console.log(err); res.send(500);}
        res.redirect('/profile_setup_basicinfo');
    }
    
};

/* Profile Setup - Basic Info */
exports.basicinfo = function(req, res) {
    if (!req.user) {
        res.redirect('/');
    }

    res.render('profile_setup_basicinfo', {user: JSON.stringify(req.user)}); 
}

/* Add Basic Info to DB */
exports.addbasicinfo = function(req, res, next) {
    if (!req.user) {
        res.redirect('/');
    } else {
        if (isValid(req.body.firstname) && isValid(req.body.lastname) && isValid(req.body.age) 
           && isValid(req.body.city) && isValid(req.body.state)) {
            var location = req.body.city + ", " + req.body.state;

            var profile = {
                name: {
                    first: req.body.firstname,
                    last: req.body.lastname
                },
                age: req.body.age,
                location: location,
                about_me: req.body.about_me,
                imageURL: req.body.imageURL,
                looking: true
            }

            var query = {username: req.user.username};

            User.update(query, profile, function(err, numAffected, raw) {
                if (err) { 
                    console.log(err);
                    res.send(500);
                } else {
                    console.log('The number of updated users was %d', numAffected);
                    console.log('The raw response from Mongo was ', raw);
                    res.redirect('/profile_setup_gymandactivities');
                }
            })
        } else {
            res.render('profile_setup_basicinfo', {message: 'Please fill in fields for name, age, city, and state.', 
                firstname: req.body.firstname, lastname: req.body.lastname, age: req.body.age, 
                city: req.body.city, state: req.body.state, about_me: req.body.about_me, 
                imageURL: req.body.imageURL});
        }
    }  
}

/* Profile Setup - Gym and Activities */
exports.gymandactivities = function(req, res) {
    if (!req.user) {
        res.redirect('/');
    }

    res.render('profile_setup_gymandactivities', {user: JSON.stringify(req.user)}); 
}

/* Add Gym and Activities to DB */
exports.addgymandactivities = function(req, res, next) {
    if (!req.user) {
        res.redirect('/');
    } else {
        if (req.body.activity) {

            var profile = {
                gym: req.body.gym,
                activities: req.body.activity
            }

            console.log(profile);

            var query = {username: req.user.username};

            User.update(query, profile, function(err, numAffected, raw) {
                if (err) { 
                    console.log(err);
                    res.send(500);
                } else {
                    console.log('The number of updated users was %d', numAffected);
                    console.log('The raw response from Mongo was ', raw);
                    res.redirect('/profile_setup_availability');
                }
            })
        } else {
            res.render('profile_setup_gymandactivities', {message: 'Please select some exercises.', 
                gym: req.body.gym});
        }
    }
}

/* Profile Setup - Availability */
exports.availability = function(req, res) {
    if (!req.user) {
        res.redirect('/');
    }

    res.render('profile_setup_availability', {user: JSON.stringify(req.user)}); 
}

/* Add Availability to DB */
exports.addavailability = function(req, res, next) {
    if (!req.user) {
        res.redirect('/');
    } else {
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
}

/* View own profile */

exports.view = function(req, res) {

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
                    'firstname' : user.name.first,
                    'lastname' : user.name.last,
                    'username': user.username,
                    'age': user.age,
                    'looking':user.looking,
                    'imageURL': user.imageURL,
                    'location': user.location,
                    'city' : user.location.split(",")[0],
                    'state' : user.location.split(",")[1],
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

            Friend.find({"friend1": req.user.username, "friend2": username}).exec(function (err, friends) {
				if(err) {console.log(err); res.send(500);}
				
				var isFriend;
				if(friends.length > 0) {
					isFriend = true;
				} else {
					isFriend = false;
				}

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
						'schedule': user.schedule,
						'isFriend': isFriend
					}); 
				} else {
					res.render('index', {
						user: req.user ? JSON.stringify(req.user) : null,
						'current_user': req.user ? req.user.username : 'null'
					});
				}
			});
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
    if (!req.user) {
        res.redirect('/');
    } 

    var userBasicInfo = req.body;


    var location = userBasicInfo['city'] + ", " + userBasicInfo['state'];

    var profile = {
        name: {
            first: userBasicInfo['firstname'],
            last: userBasicInfo['lastname'],
        },
        age: userBasicInfo['age'],
        location: location,
        gym: userBasicInfo['gym'],
        about_me: userBasicInfo['about_me']
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

exports.editActivities = function(req, res, next) {
    if (!req.user) {
        res.redirect('/');
    }

    var json = req.body;
    var activities = json['activities'];
    var query = {username: req.user.username};
    User.update(
        query, 
        { $set: { activities: activities } }, 
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

exports.editAvailability = function(req, res, next) {
    if (!req.user) {
        res.redirect('/');
    }

    var json = req.body;
    var availability = json['availability'];
    var query = {username: req.user.username};
    User.update(
        query, 
        { $set: { availability: availability } }, 
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

exports.editLooking = function(req, res, next) {
    if (!req.user) {
        res.redirect('/');
    }

    var json = req.body;
    var looking = json['looking'];
    var query = {username: req.user.username};
    User.update(
        query, 
        { $set: { looking: looking } }, 
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
