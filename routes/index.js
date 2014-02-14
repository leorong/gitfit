/*
 * GET home page.
 */



exports.newSession = function(req, res){
	console.log(req.query.username);
	console.log('bah');
	req.session.username = req.query.username;
	req.session.lastPage = 'Login Page';
	res.write('Last page was ' + req.session.lastPage);
	console.log(req.session.username);
	var obj = {};
	obj['username'] = req.session.username;
	var newObj = {};
	newObj['lastPage'] = req.session.lastPage;
	obj['pages'] = newObj;
	res.render('index', obj);//{'username': req.session.username, 'lastPage': req.session.lastPage});
};

exports.view = function(req, res){
  console.log("test");
	res.render('index');
};
