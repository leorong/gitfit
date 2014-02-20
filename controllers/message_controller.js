'use strict';
//var models = require('../models/message');

var mongoose = require('mongoose'),
    Message = mongoose.model('Message');

exports.view = function(req, res) {
    var user = req.user;
    console.log(user);
    
    if (!user) {res.redirect('/login');} //res.send(500);}

    console.log("message user: " + user.username + "----");
    Message
        .find({"from": user.username}) 
        .sort('date')
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
