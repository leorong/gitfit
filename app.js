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

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('db opened');
});

/* Models */
var user_model = require('./models/user');
var message_model = require('./models/message');
var friend_model = require('./models/friend');

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
// var findbuddy = require('./routes/findbuddy');
// var message = require('./routes/message');
// var schedule = require('./routes/schedule');

var users = require('./routes/users')(app, passport);
var index = require('./routes/index')(app, passport);
var findbuddy = require('./routes/findbuddy')(app, passport);
var message = require('./routes/message')(app, passport);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here

// app.get('/findbuddy', findbuddy.view);
// app.get('/message', message.view);
// app.get('/schedule', schedule.view);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
