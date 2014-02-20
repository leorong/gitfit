var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

function validatePresenceOf(value) {
    return value && value.length;
}

var UserSchema = new Schema({
    name: {
        first: String,
        last: String
    },
    email: {
        type: String,
        validate: [validatePresenceOf, 'Username is required']
    },
    username: {
        type: String,
        validate: [validatePresenceOf, 'Username is required'],
        unique: true
    },
    password: {
        type: String,
        validate: [validatePresenceOf, 'Password is required']
    },
    age: {
        type: Number,
        min: 10
    },
    location: {
        type: String
    },
    gym: {
        type: String
    },
    about_me: {
        type: String
    },
    imageURL: String,
    activities: {
        type: [String]
    },
    looking: {
        type: Boolean
    }
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
