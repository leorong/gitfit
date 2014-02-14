var data = require('../json/fake_users.json');

function getUser(username) {
	for(var i = 0; i < data.length; i++) { 
		var userObj = data['users'][i];
		if(userObj['name'] === username) {
			return userObj;
		}
	}
}

exports.view = function(req, res) {
	var username = req.params.username;

	var userData = getUser(username); 

	console.log(userData);

	res.render('profile', userData);
}
