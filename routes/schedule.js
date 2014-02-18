exports.view = function(req, res){
  res.render('schedule', {user: req.user ? JSON.stringify(req.user) : 'null'});
};