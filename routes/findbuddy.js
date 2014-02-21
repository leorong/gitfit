// var data = require('../json/fake_users.json');



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

// exports.view = function(req, res){
// 	var user = 'null';
// 	if (req.user) {
// 		user = JSON.stringify(req.user);
// 	}
// 	var returnObj = filtered;
// 	returnObj['user'] = user;
// 	res.render('findbuddy', returnObj);
// };

