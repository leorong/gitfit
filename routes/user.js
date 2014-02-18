// var data = require('../json/fake_users.json');

// //var users = require('../controllers/users');

// // module.exports = function(app) {
// //     app.get('/login', users.login);
// //     app.post('/login',
// //         passport.authenticate('local',{ successRedirect: '/',
// //                                         failureRedirect: '/login',
// //                                         failureFlash: true })
// //     );
// //     app.get('/signup', users.signup);
// //     app.get('/signout', users.signout);
// //     app.get('/users/me', users.me);
// //     app.get('/buddylist', users.buddylist);
// // };

// var mongoose = require('mongoose'),
//     User = mongoose.model('User');

// exports.view = function(req, res) {
// 	var users = data['users'];
//     var randomIndex = Math.floor(Math.random() * users.length);
// 	var randomUser = users[randomIndex];

// 	res.render('user', users[0]);
// }