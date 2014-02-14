var data = require('../json/fake_users.json');

exports.view = function(req, res) {
	var users = data['users'];
	var randomIndex = Math.floor(Math.random() * users.length);
	var randomUser = users[randomIndex];
	res.render('user', randomUser);
}