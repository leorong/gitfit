'use strict';
var data = require('../json/fake_users.json');

var mongoose = require('mongoose'),
	User = mongoose.model('User');

/* Index page. Also populates db with fake users */
exports.view = function(req, res) {
    //if (User.find({username: "rtran58"}) == None) {
    //    console.log("Empty db");
    //}

    var oldUsers = data["users"];
    for (var i = 0; i < oldUsers.length; i++) {
        var user = oldUsers[i];
        var split = user.name.split(' ');
        var firstName = split[0];
        var lastName = split[1];

        var newPerson = new User({
            name: {first: firstName, last: lastName},
            username: user.username,
            email: "random@email.com",
            password: "password",
            age: user.age,
            location: user.location,
            about_me: user.about_me,
            imageURL: user.imageURL,
            gym: user.gym,
            activities: user.activities,
            looking: user.looking
        });
        newPerson.save();
    }
    if (!req.user) {
        res.render('index', {user: null});
    } else {
        res.render('index', {
            user: JSON.stringify(req.user),
            'current_user': req.user.username
        });
    }
}