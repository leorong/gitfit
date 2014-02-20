'use strict';
var models = require('../models/message');

exports.view = function(req, res) {
    var user = req.user;
    
    if (!user) {res.redirect('/login'); res.send(500);}

    console.log("message user: " + user.username + "----");
    models.Message
        .find({"from": user.username}) 
        .sort('date')
        .exec(renderMessages);

    function renderMessages(err, messages) {
        if(err) {console.log(err); res.send(500);}
        console.log(messages);
        res.render('message', {"messages": messages});
    }
}
