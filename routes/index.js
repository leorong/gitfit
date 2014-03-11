'use strict';
var index = require('../controllers/index_controller');
/* GET home page. */

module.exports = function(app, passport) {
	app.get('/', index.view);
};