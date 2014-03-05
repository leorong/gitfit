var Mongoose = require('mongoose');

var MessageSchema = new Mongoose.Schema({
    "from": String,
    "to": String,
    "subject": String,
    "message": String,
    "date": String,
    "opened": Boolean
});
exports.Message = Mongoose.model('Message', MessageSchema);
