'use strict';

/* GET home page. */

module.exports = function(app) {
	var index = require('../controllers/index_controller');
	app.get('/flash', function(req, res){
	  // Set a flash message by passing the key, followed by the value, to req.flash().
	  req.flash('info', 'Flash is back!');
	  res.redirect('/');
	});
	app.get('/', index.view);
};


// exports.view = function(req, res){
//   	console.log("test");
// 	res.render('index');
// };