var data = require('../json/fake_users.json');

exports.view = function(req, res){
	res.render('profile_setup', data);
};

