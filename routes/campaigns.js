/*
 * CAMPAIGN API ROUTES
 */

var Campaign = require('../models/campaign')
var User = require('../models/user')
var authHelpers = require('./auth-helpers')

module.exports = function(app) {

  // CAMPAIGNS INDEX
  app.get('/api/campaigns', function (req, res) {
    Campaign.find().sort('-_id').populate('user', '_id name').exec(function(err, campaigns) {
      if (err) { return res.status(404).send(err) };
      
      res.status(200).json(campaigns); // return all nerds in JSON format
    });
  });

  // CAMPAIGNS SHOW
  app.get('/api/campaigns/:id', function (req, res) {
    console.log('finding campaign')
    Campaign.findById(req.params.id).populate('user').populate('articles').exec(function(err, campaign) {
      if (err) { return res.status(404).send(err) };
      campaign.impression_count = campaign.impressions_count++
      campaign.save();

      res.status(200).json(campaign); // return all nerds in JSON format
    });
  });

  // CREATE
  app.post('/api/campaigns', authHelpers.ensureAuthenticated, function (req, res) {
    var campaign = new Campaign(req.body);
    campaign.user = req.user
    console.log(campaign);

    campaign.save(function (err, campaign) {
      console.log('campaign saved')

      User.findById(req.user, function(err, user) {
        if (err) { return res.send(err) };
        user.campaigns.unshift(campaign) 
        user.save(function(err) {
          if (err) { return res.send(err) };
          res.status(201).json(campaign);
        });
      });
    });
  });

  app.put('/api/campaigns/:id', authHelpers.ensureAuthenticated, function (req, res) { 
    Campaign.findOneAndUpdate({ _id: req.params.id }, req.body, function(err, campaign) {
      res.status(200).json(campaign);
    })
  })

  // DELETE
  // UPDATE


}