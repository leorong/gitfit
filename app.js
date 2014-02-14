/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('db opened');
});

var index = require('./routes/index');
var login = require('./routes/login');
var signup = require('./routes/signup');
var user = require('./routes/user');
var buddylist = require('./routes/buddylist');
var findbuddy = require('./routes/findbuddy');
var message = require('./routes/message');
var schedule = require('./routes/schedule');

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
app.use(express.bodyParser());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

var clientSessions = require('client-sessions');
app.use(clientSessions({
  secret: '320SDF3242fw1409LrE8d6RT3wq1oOhsl1' // set this to a long random string!
}));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', login.view);
app.post('/', login.session)
app.get('/index', index.view);
app.get('/signup', signup.view);
app.get('/user', user.view);
app.get('/buddylist', buddylist.view);
app.get('/findbuddy', findbuddy.view);
app.get('/message', message.view);
app.get('/schedule', schedule.view);

// Example route
//app.get('/user.html', user.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});