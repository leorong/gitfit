exports.check = function(req, res) {    
	console.log(req.query.username);
	req.session.username = req.query.username;
	console.log(req.session.username);
	// var user = {};
	// user.name = req.query.firstname + " " + req.query.lastname;
	// user.user_name = req.query.username;
	// user.age = req.query.age;
	// user.gym = req.query.gym;
	// user.location = req.query.city + ", " + req.query.state;
	// user.about_me = req.query.about_me;
	// user.imageURL = req.query.image_url;
	// user.activities = ["basketball"];
	// data["users"].push(user);
	res.render('index', {'username': req.session.username});
 }