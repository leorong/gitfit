var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        first: String,
        last: String
    }
    email: String,
    username: {
        type: String,
        unique: true
    },
    password: String,
    age: {
        type: Number,
        min: 10
    },
    location: String,
    gym: String,
    about_me: String,
    imageURL: String,
    activities: [String],
    looking: Boolean
});

/* Virtual Methods */

UserSchema.virtual('name.full').get(function () {
    return this.name.first + ' ' + this.name.last;
});

UserSchema.virtual('name.full').set(function (name) {
    var split = name.split(' ');
    this.name.first = split[0];
    this.name.last = split[1];
});

// UserSchema.virtual('password').set(function (password) {
//     this.password = String;
// });

// UserSchema.virtual('password').get(function () {
//     return this.password;
// });

mongoose.model('User', UserSchema);

// module.exports = function(mongoose) {
// 	var userSchema = new Schema({
// 		login: String,
// 		first_name: String,
// 		last_name: String,
// 		age: Number,
// 		about_me: String,
// 		gym: String
// 	});

// 	var models = {
// 		User : mongoose.model('User', userSchema)
// 	};
// 	return models;
// }