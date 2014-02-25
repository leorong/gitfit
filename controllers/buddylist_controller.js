'use strict';

var mongoose = require('mongoose');
var Friend = mongoose.model('Friend');
var User = mongoose.model('User');

exports.view = function(req, res) {
    if (!req.user) {res.render('/login');}

    Friend
        .find({"friend1": req.user.username})
        .sort("friend2")
        .exec(renderFriends);

    function renderFriends(err, friends) {
        if(err) {console.log(err); res.send(500);}

        
        function getBuddyUserObjArr(friends) {
            var userArr = [];

            for(var i=0; i<friends.length; i++) {
                User.find({"username": friends[i].friend2}).exec(
                function (err, user) {
                    var u = function returnUser(user) {
                        var u = user[0];
                        return u;
                    }(user);
                    
                    console.log("user1:")
                    console.log(u);            
                    
                    userArr.push(u);
                });
            }
            return userArr;
        }

        var buddyUserObjArr = getBuddyUserObjArr(friends);
        res.render('buddylist', {
            "friends": buddyUserObjArr
        });
    }

}

