/*
 * USER API ROUTES
 */


var User = require('../models/user');

module.exports = function(app) {
 // SHOW
 app.get('/api/users/:id', function (req, res) {
  console.log('blah')
   User.findOne({ handle: req.params.id }).populate('campaigns').exec(function(err, user) {
     if (err) { return res.status(404).send(err) };
     res.status(200).json(user); 
   });
 });
}