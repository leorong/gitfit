var data = require('../json/fake_users.json');

var getUser = function(username) {
	for(var i = 0; i < data['users'].length; i++) { 
		var userObj = data['users'][i];
		if(userObj['user_name'] === username) {
			console.log(userObj['activities']);
			return userObj;
		}
	}
}


exports.view = function(req, res) {
	var username = req.params.username;
	var userData = getUser(username);

	res.render('profile', userData);
}