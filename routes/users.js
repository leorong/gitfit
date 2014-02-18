'use strict';

var data = require('../json/fake_users.json');

var users = require('../controllers/users_controller');

module.exports = function(app, passport) {
	//app.get('/', users.index);
    app.get('/login', users.login);
    app.post('/login',
        passport.authenticate('local',{ successRedirect: '/',
                                        failureRedirect: '/login',
                                        failureFlash: true })
    );
    app.get('/signup', users.signup);
    app.get('/signout', users.signout);
    //app.get('/users/me', users.me);
    app.get('/user/:username', users.view);
    app.post('/user', users.create);
    app.get('/buddylist', users.buddylist);
};