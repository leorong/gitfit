'use strict';

var data = require('../json/fake_users.json');

var users = require('../controllers/users_controller');

module.exports = function(app, passport) {
    app.get('/login', users.login);
    // app.post('/login', passport.authenticate('local',{ 
    //     successRedirect: '/',
    //     failureRedirect: '/login',//,
    //     failureFlash: true })
    // );
    app.get('/signup', users.signup);
    app.post('/create', users.create);
    app.get('/profile_setup', users.setup);
    app.post('/addprofile', users.addprofile);
    app.get('/signout', users.signout);
    app.get('/profile/:username', users.viewProfile);
    app.get('/user/:username', users.view);
    app.get('/buddylist', users.buddylist);
    app.get('/buddylist/:username', users.unfriend);
    app.get('/findbuddy', users.findbuddy);
    app.get('/schedule', users.schedule);
    app.get('/schedule_setup', users.schedule_setup);
    // app.post('/findbuddy',);

    app.post('/login', function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
            if (err) {return next(err);}
            if (!user) {
                return res.render('login', {message: 'Invalid username or password.'});
            }
            req.logIn(user, function(err) {
                if (err) { return next(err);}
                return res.redirect('user/'+user.username);
            });
        })(req, res, next);
    });

    // app.post('/create', function(req, res, next) {
        
    // });
};
