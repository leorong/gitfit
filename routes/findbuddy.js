var data = require('../json/fake_users.json');



var filter = function(gym) {
	var filteredUsers = {'users':[]};

	for (i = 0; i < data.length; i++) {
		var foundUser = data[i];
		if (foundUser['gym'] === gym) {
			filteredUsers['users'].push(foundUser);
		}
	}
	return filteredUsers;
}

var filtered = filter('Arrillaga West');

exports.view = function(req, res){
	var user = 'null';
	if (req.user) {
		user = JSON.stringify(req.user);
	}
	var returnObj = filtered;
	returnObj['user'] = user;
	res.render('findbuddy', returnObj);
};

