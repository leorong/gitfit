var data = require('../json/fake_users.json');



var filter = function(users, gym) {
	var filteredUsers = {'users':[]};

	for (i = 0; i < users.length; i++) {
		var foundUser = users[i];
		if (foundUser['gym'] === gym) {
			filteredUsers['users'].push(foundUser);
		}
	}
	return filteredUsers;
}

var filtered = filter(data['users'], 'Arrillaga West');

exports.view = function(req, res){
  res.render('findbuddy', filtered);
};

