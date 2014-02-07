var data = require('../json/searchResult.json');

exports.view = function(req, res){
  res.render('findbuddy', data);
};