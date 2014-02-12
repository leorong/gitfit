// var mongoose = require('mongoose')
// 	,Schema = mongoose.Schema;

module.exports = function(mongoose) {
	var userSchema = new Schema({
		login: String,
		first_name: String,
		last_name: String,
		age: Number,
		about_me: String,
		gym: String
	});

	var models = {
		User : mongoose.model('User', userSchema)
	};
	return models;
}