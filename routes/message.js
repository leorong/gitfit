exports.view = function(req, res){
  res.render('message', {user: req.user ? JSON.stringify(req.user) : 'null'});
};