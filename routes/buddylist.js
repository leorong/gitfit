var data = require('../json/buddylist.json');

exports.view = function(req, res){
  res.render('buddylist', data);
};