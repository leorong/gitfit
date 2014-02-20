/**
 * Module dependencies.
 */
var flash = require('connect-flash');
var express = require('express'),
	http = require('http'),
    path = require('path'),
    handlebars = require('express3-handlebars'),
    passport = require('passport');

var mongoose = require('mongoose');

var local_database_name = 'test';
var local_database_uri = 'mongodb://localhost/' + local_database_name;
var database_uri = process.env.MONGOLAB_URI || local_database_uri;
mongoose.connect(database_uri);

/*
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('db opened');
});
*/

/* Models */
var user_model = require('./models/user');
var message_model = require('./models/message');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session({secret: '320SdF3r42fw1409LrE8d6RT3wq1oOhsl1'}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

/* Passport config */
require('./config/passport')(passport);

/* Routes */
// var routes = require('./routes');
//var index = require('./routes/index');
var login = require('./routes/login');
var login_check = require('./routes/login_check');
//var signup = require('./routes/signup');
//var user = require('./routes/user');
//var buddylist = require('./routes/buddylist');
var findbuddy = require('./routes/findbuddy');
var message = require('./routes/message');
var schedule = require('./routes/schedule');
var profile_setup = require('./routes/profile_setup');
var profile_edit = require('./routes/profile_edit');
// var profile = require('./routes/profile');

var users = require('./routes/users')(app, passport);
var index = require('./routes/index')(app, passport);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
// app.get('/', login.view);
// app.get('/login_check', login_check.check);
// app.get('/index', index.view);
// app.get('/signup', signup.view);
// app.get('/user', user.view);
// app.get('/buddylist', buddylist.view);
// app.get('/findbuddy', findbuddy.view);
// app.get('/message', message.view);
// app.get('/schedule', schedule.view);
app.get('/profile_setup', profile_setup.view);
app.get('/profile_edit', profile_edit.edit);
// app.get('/profile/:username', profile.view);


// Example route
//app.get('/user.html', user.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
