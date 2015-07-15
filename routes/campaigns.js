/*
 * campaigns.js
 */

var Campaign = require('mongoose').model('Campaign');

module.exports = function(app) {

  // CAMPAIGNS INDEX
  app.get('/api/campaigns', function (req, res) {
    Campaign.find().sort('-created_at').exec(function(err, campaigns) {
      if (err) { return res.status(404).send(err) };
      
      res.status(200).json(campaigns); // return all nerds in JSON format
    });
  });

  // CAMPAIGNS SHOW
  app.get('/api/campaigns/:id', function (req, res) {
    console.log(req.params.id)
    Campaign.findOne({ _id: req.params.id }).exec(function(err, campaign) {
      if (err) { return res.status(404).send(err) };
      
      res.status(200).json(campaign); // return all nerds in JSON format
    });
  });

  // CREATE
  app.post('/api/campaigns', function (req, res) {
    var campaign = new Campaign(req.body);
    console.log(campaign);
    
    campaign.save(function (err, campaign) {
      console.log('campaign saved')
      if (err) { return res.send(err) };
      res.status(201); 
      io.sockets.emit('campaign.published', campaign);
    });
  });


}