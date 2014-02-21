var Mongoose = require('mongoose');

function validatePresenceOf(value) {
    return value && value.length;
}

var UserSchema = new Mongoose.Schema({
    "name": {
        "first": String,
        "last": String
    },
    "email": {
        "type": String,
        "validate": [validatePresenceOf, 'Username is required']
    },
    "username": {
        "type": String,
        "validate": [validatePresenceOf, 'Username is required'],
        "unique": true
    },
    "password": {
        "type": String,
        "validate": [validatePresenceOf, 'Password is required']
    },
    "age": {
        "type": Number,
        "min": 10
    },
    "location": {
        "type": String
    },
    "gym": {
        "type": String
    },
    "about_me": {
        "type": String
    },
    "imageURL": String,
    "looking": Boolean,

    "activities": [String],

    "schedule": {
        "monday" : [{
            "activity": String,
            "startTime": String,
            "endTime": String
        }],
        "tuesday": [{
            "activity": String,
            "startTime": String,
            "endTime": String
        }],
        "wednesday": [{
            "activity": String,
            "startTime": String,
            "endTime": String
        }], 
        "thursday": [{
            "activity": String,
            "startTime": String,
            "endTime": String
        }],
        "friday": [{
            "activity": String,
            "startTime": String,
            "endTime": String
        }],
        "saturday": [{
            "activity": String,
            "startTime": String,
            "endTime": String
        }],
        "sunday": [{
            "activity": String,
            "startTime": String,
            "endTime": String
        }]
    },

    "availability": {
        "monday": {
            "morning": Boolean,
            "afternoon": Boolean,
            "evening": Boolean
        },
        "tuesday": {
            "morning": Boolean,
            "afternoon": Boolean,
            "evening": Boolean
        },
        "wednesday": {
            "morning": Boolean,
            "afternoon": Boolean,
            "evening": Boolean
        },
        "thursday": {
            "morning": Boolean,
            "afternoon": Boolean,
            "evening": Boolean
        },
        "friday": {
            "morning": Boolean,
            "afternoon": Boolean,
            "evening": Boolean
        },
        "saturday": {
            "morning": Boolean,
            "afternoon": Boolean,
            "evening": Boolean
        },
        "sunday": {
            "morning": Boolean,
            "afternoon": Boolean,
            "evening": Boolean
        }
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


exports.User = Mongoose.model('User', UserSchema);

