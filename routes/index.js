'use strict';

/* GET home page. */

module.exports = function(app) {
	var index = require('../controllers/index_controller');
	app.get('/', index.view);
};


// exports.view = function(req, res){
//   	console.log("test");
// 	res.render('index');
// };