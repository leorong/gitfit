'use strict';
var message = require('../controllers/message_controller');
/* GET home page. */

module.exports = function(app, passport) {
	var index = require('../controllers/index_controller');
	// app.get('/flash', function(req, res){
	//   // Set a flash message by passing the key, followed by the value, to req.flash().
	//   req.flash('info', 'Flash is back!');
	//   res.redirect('/');
	// });
	app.get('/', index.view);
    //app.get('/findbuddy', findbuddy.view);
    app.get('/message', message.view);
    app.get('/message/new', message.viewForm);
    app.post('/message/new', message.addNewMessage);
    //app.get('/schedule', schedule.view);
};


// exports.view = function(req, res){
//   	console.log("test");
// 	res.render('index');
// };
