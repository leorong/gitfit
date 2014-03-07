var Mongoose = require('mongoose');

var FriendSchema = new Mongoose.Schema({
    "friend1": String,
    "friend2": String
});
exports.Friend = Mongoose.model('Friend', FriendSchema);
