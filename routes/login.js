var data = require('../json/fake_users.json');

//var user = req.session.username

exports.view = function(req, res){
  res.render('login');
};

exports.session = function(req, res) {
	req.session.username = req.body.username;
	res.render('index', {username: req.session.username});
}

