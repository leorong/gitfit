var Mongoose = require('mongoose');

var MessageSchema = new Mongoose.Schema({
    "from": String,
    "to": String,
    "message": String,
    "date": Date,
    "opened": Boolean
});
exports.Message = Mongoose.model('Message', MessageSchema);
