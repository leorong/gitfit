var Mongoose = require('mongoose');

var FriendsSchema = new Mongoose.Schema({
    "friend1": String,
    "friend2": String,
});
exports.Friend = Mongoose.model('Friend', FriendSchema);
