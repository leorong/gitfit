'use strict';
//var models = require('../models/message');

var mongoose = require('mongoose'),
    Message = mongoose.model('Message'),
	Friend = mongoose.model('Friend'),
	User = mongoose.model('User');

var moment = require('moment-timezone');

exports.view = function(req, res) {
    var user = req.user;
    
    if (!user) {res.render('/login');} //res.send(500);}

    // console.log("message user: " + user.username + "----");
    Message
        .find({$or:[{"to": user.username},{"from":user.username}]}) 
        .sort({date: -1})
        .exec(renderMessages);

    function renderMessages(err, messages) {
        if(err) {console.log(err); res.send(500);}
       
		var returnList = [];
	
		for(var i = 0; i < messages.length; i++) {
			var messageObj = messages[i];
			if(user.username === messageObj.from) {
				returnList.push({
					'message':messages[i],
					'reply':false
				});
			} else {
				returnList.push({
					'message':messages[i],
					'reply':true
				});
			}
		}
	
		Friend.find({"friend1":user.username}).exec(addFriends);

		function addFriends(err, friends) {
			var friend2Arr = [];
			for(var j = 0; j < friends.length; j++) {
				friend2Arr.push(friends[j].friend2);
			}
			var realNamesArray = [];
			for(var j = 0; j < friend2Arr.length; j++) {
				User.find({"username" : friend2Arr[j]}, addUsers);
			}

			function addUsers(err, users) {
				for(var j = 0; j < users.length; j++) {
					var name = users[j].name.first + " " + users[j].name.last;
					realNamesArray.push(name);
				}

				res.render('message', {
					"realNames" : realNamesArray, 
					"messages": returnList,
					user: req.user ? JSON.stringify(req.user) : null,
					'current_user': req.user.username
				});
			}
		}    
	}
}

exports.reply = function(req, res) {
    var user = req.user;

    if(!user) {res.render('login')};

    res.render('newmessage', {
        user: req.user ? JSON.stringify(req.user) : null,
        'current_user': req.user.username,
        'to': req.params.username
    });
}

exports.deleteMessage = function(req, res) {
	var user = req.user;
	if(!user) {res.render('/login');}

	var messageID = req.params.id;

	Message.find({"_id": messageID}).remove().exec(afterRemoving);

	function afterRemoving(err) {
		if(err) {console.log(err); res.send(500)};
	}
}

exports.addNewMessage = function(req, res) {
    var user = req.user;

    if(!user) {res.render('/login');}

    var form_data = req.body;
    var curDate = moment().tz("America/Los_Angeles").format('MMM Do YYYY, h:mm:ss a');

    // console.log(form_data);

    //need to check if valid to user
    var newMessage = new Message({
        "to": form_data.to,
        "from": user.username,
        "date": curDate,
        "subject": form_data.subject,
        "message": form_data.message,
        "opened": false
    });

    newMessage.save(afterAdding);

    function afterAdding(err) {
        if(err) {console.log(err); res.send(500);}
    }
}
