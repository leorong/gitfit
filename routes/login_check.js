var data = require('../json/fake_users.json');

exports.check = function(req, res) {    
	console.log(req.query.username);
	req.session.username = req.query.username;
	req.session.trueUser = false;
	users = data['users']

	for (i = 0; i < users.length; i++) {
		if (users[i]['user_name'] === req.session.username) {
			req.session.trueUser = true;
			res.render('index', {'username': req.session.username, 'logged_in': req.session.trueUser});
		}
	}
	res.render('signup');
 }