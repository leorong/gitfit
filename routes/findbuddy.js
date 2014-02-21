// var data = require('../json/fake_users.json');



<<<<<<< HEAD
// var filter = function(users, gym) {
// 	var filteredUsers = {'users':[]};

// 	for (i = 0; i < users.length; i++) {
// 		var foundUser = users[i];
// 		if (foundUser['gym'] === gym) {
// 			filteredUsers['users'].push(foundUser);
// 		}
// 	}
// 	return filteredUsers;
// }

// var filtered = filter(data['users'], 'Arrillaga West');
=======
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
>>>>>>> 6b06455aadee130477c3bb8f2ca4dd272d7bd8ff

// exports.view = function(req, res){
// 	var user = 'null';
// 	if (req.user) {
// 		user = JSON.stringify(req.user);
// 	}
// 	var returnObj = filtered;
// 	returnObj['user'] = user;
// 	res.render('findbuddy', returnObj);
// };

