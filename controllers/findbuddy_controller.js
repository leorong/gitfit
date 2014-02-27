'use strict';

var mongoose = require('mongoose');
var Friend = mongoose.model('Friend');
var User = mongoose.model('User');
//var Handlebars = require('express3-handlebars');


exports.view = function(req, res) {
    if(!req.user) {res.redirect('login');}

    User.find({gym: req.user.gym}).exec(sortUsers);

    function sortUsers(err, buddies) {
        var returnList = [];
        var user = req.user;
        
        /*
        if(user) {
            console.log("Current user is ", user.username);
        } else {
            console.log("Did not pass user");
        }

        if(buddies) {
            console.log("Buddies: ");
            console.log(buddies);
        } else {
            console.log("Did not pass buddies");
        }
        */

        for(var i = 0; i < buddies.length; i++) {
            var score = 0;

            var buddy = buddies[i];
            var buddyActivities = buddy.activities;
            var userActivities = user.activities;

            if(userActivities.length < buddyActivities) {
                var short = userActivities;
                var longer = buddyActivities;
            } else {
                var short = buddyActivities;
                var longer = buddyActivities;
            }

            var activityMultiplier = 0;

            for(var j = 0; j < short.length; j++) {
                var exercise = short[j];
                if(longer.indexOf(exercise) > -1) {
                    activityMultiplier += 1;
                }
            }

            var buddyAvailability = buddy.availability;
            var userAvailability = user.availability;

            var availabilityMultiplier = getOverlap(userAvailability, buddyAvailability);

            score = activityMultiplier * availabilityMultiplier;

            if(user.username != buddy.username) {
                returnList.push({
                    'buddy': buddy,
                    'score': score,
                });
            }
        }
        
        returnList.sort(function (a,b) {
            return(a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0);
        });

        Friend
            .find({'friend1': user.username})
            .exec(transferFriends);

        function transferFriends(err, friends) {
            var friendsArr = [];
            for(var i=0; i<friends.length; i++) {
                
                var friend = function returnFriend(friend) {
                    var f = friend;
                    return f;
                }(friends[i]);
                
                var friend = {
                    'friend1':user.username,
                    'friend2':friend.friend2
                }
                friendsArr.push(friend);
            }


            console.log(friendsArr);
            res.render('findbuddy', {
                'user': req.user ? JSON.stringify(req.user) : null,
                'current_user': req.user ? req.user.username : null,
                'buddies': returnList,
                'friends': friendsArr 
            });
        }
    }

    function getOverlap(userAvailability, buddyAvailability) {
        var multiplier = 1;
        //var dayOverlap = 0;
        //        //var timeOverlap = 0;
    
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

        /*
        console.log("User avail length is, ", userAvailability.length);
        console.log("buddy avail length is, ", buddyAvailability.length);

        for (var day = 0; day < 7; day++) {
            console.log(userAvailability[day]);
            if (userAvailability[day]['morning'] == buddyAvailability[day]['morning']) {
                multiplier += 1;
                console.log("Upped morning multiplier");
            }
            if (userAvailability[day]['afternoon'] == buddyAvailability[day]['afternoon']) {
                multiplier += 1;
                console.log("Upped afternoon multiplier");
            }
            if (userAvailability[day]['evening'] == buddyAvailability[day]['evening']) {
                multiplier += 1;
                console.log("Upped evening multiplier");                                                                                                              
            }
        }
        */
        return multiplier;
    }
};

exports.addBuddy = function(req, res) {
    if(!req.user) {res.redirect('/login'); res.send(500);}

    var user = req.user;
    var buddyid = req.params.buddyid;
    var newFriendRel1 = new Friend({
        "friend1": user.username,
        "friend2": buddyid
    });

    var newFriendRel2 = new Friend({
        "friend1": buddyid,
        "friend2": user.username
    });
    
    newFriendRel1.save(afterFirstAdd);

    function afterFirstAdd(err) {
        if(err) {console.log(err); res.send(500);}
        newFriendRel2.save(afterSecondAdd);
        
        function afterSecondAdd(err) {
            if(err) {console.log(err); console.log('second add relationship failed'); res.send(500);}
            res.redirect('/findbuddy');
        }
    }
};

/*
Handlebars.registerHelper("isFriend", function(userid, buddyid) {
    Friend
        .find()
        .exec(afterFinding);

    function afterFind(err, friends) {
        return (friends.length > 0);
    }
});
*/

