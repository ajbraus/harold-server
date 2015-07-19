/*
 * USER API ROUTES
 */


var User = require('../models/user');
var Campaign = require('../models/campaign');

module.exports = function(app) {
 // SHOW
 app.get('/api/users/:id', function (req, res) {
  console.log('api returning user')
  User.findOne({ handle: req.params.id })
    .populate('campaigns').exec(function(err, user) {
      Campaign.populate(user.campaigns, { path:'articles' }, function(err, data) {
        if (err) { return res.status(404).send(err) };
        res.status(200).json(user); 
      });
    });
 });
}