'use strict';
//var models = require('../models/message');

var mongoose = require('mongoose'),
    Message = mongoose.model('Message');

exports.view = function(req, res) {
    var user = req.user;
    console.log(user);
    
    if (!user) {res.render('/login');} //res.send(500);}

    console.log("message user: " + user.username + "----");
    Message
        .find({"to": user.username}) 
        .sort({date: -1})
        .exec(renderMessages);

    function renderMessages(err, messages) {
        if(err) {console.log(err); res.send(500);}
        console.log(messages);
        res.render('message', {
            "messages": messages,
            user: req.user ? JSON.stringify(req.user) : null,
            'current_user': req.user.username
        });
    }
}

exports.viewForm = function(req, res) {
    res.render('newmessage');
}

exports.addNewMessage = function(req, res) {
    console.log("in add new message");
    var user = req.user;

    if(!user) {res.render('/login');}

    var form_data = req.body;
    var curDate = new Date();

    console.log(form_data);

    //need to check if valid to user
    var newMessage = new Message({
        "to": form_data.to,
        "from": user.username,
        "date": curDate,
        "message": form_data.message,
        "opened": false
    });

    newMessage.save(afterAdding);

    function afterAdding(err) {
        if(err) {console.log(err); res.send(500);}
        res.redirect('/message');
    }
}
