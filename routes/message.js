'use strict';

var message = require('../controllers/message_controller');

module.exports = function(app, passport){
    app.get('/message', message.view);
    app.get('/message/reply/:username', message.reply);
    app.post('/message/new', message.addNewMessage);
};
