
/*
  This script will initialize a local Mongo database
  on your machine so you can do development work.

  IMPORTANT: You should make sure the

      local_database_name

  variable matches its value in app.js  Otherwise, you'll have
  initialized the wrong database.
*/

var mongoose = require('mongoose');
var models   = require('./models/user');

// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_database_name = 'test';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);


// Do the initialization here

// Step 1: load the JSON data
var user_json = require('./json/fake_users.json');

var updateRicky = {
  imageURL:"http://www.returnofkings.com/wp-content/uploads/2013/06/Arnold-Schwarzenegger11-300x300.jpg"
};
// Step 2: Remove all existing documents
models.User
  .update({username:"rtran58"}, updateRicky, afterFind)
  .exec(afterFind); // callback to continue at

// Step 3: load the data from the JSON file
function afterFind(err, users) {
  	if(err) console.log(err);

	/*
  	for(var i=0; i<users.length; i++) {
    	var newImageURL = {
			"imageURL": "images/anonymous-user.jpg"
		}	

		var updated_count = 0;
    	models.User.update({username: users[i].username}, newImageURL, function(err) {
      		if(err) console.log(err);

      		updated_count++;
      		console.log(updated_count + ' updated');
      });
	}
	*/

	console.log("DONE");
	mongoose.connection.close();
}



