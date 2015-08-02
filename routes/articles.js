/*
 * ARTICLE API ROUTES
 */

var Article = require('../models/article');
var User = require('../models/user');
var Campaign = require('../models/campaign');
var authHelpers = require('./auth-helpers')

module.exports = function(app) {
  // ARTICLES INDEX
  app.get('/api/articles', function (req, res) {
    Article.where("published_at").ne(null).sort('-created_at').exec(function(err, articles) {
      if (err) { return res.status(404).send(err) };

      res.status(200).json(articles); // return all nerds in JSON format
    });
  });

  // CREATE
  app.post('/api/articles', authHelpers.ensureAuthenticated, function (req, res) {
    console.log(req.body)
    console.log(req.user)
    var article = new Article(req.body)
    article.author = req.user
    console.log(article);

    article.save(function (err, article) {
      console.log('article saved')
      if (article) {
        User.findById(req.user, function(err, user) {
          user.drafts.unshift(article);
          user.save(function() {
            if (article.campaign) {
              Campaign.findById(article.campaign, function(err, campaign) {
                if (err) { return res.send(err) };
                campaign.articles.unshift(article);
                campaign.save(function(err) {
                  if (err) { return res.send(err) };
                  res.status(201).json(article)
                });
              })
            } else {
              res.status(201).json(article)
            }
          })
        })
      } else {
        res.send(err)
      }
    });
  });

  app.put('/api/articles', authHelpers.ensureAuthenticated, function (req, res) {
    console.log(req.body)
    console.log(req.user)
    
    Article.findByIdAndUpdate(req.body._id, req.body, function (err, article) {
      // UPDATE CAMPAIGN AND ADD ARTICLE TO CAMPAIGN.ARTICLES
      if (req.body.campaign) {
        console.log(req.body.campaign)
        Campaign.findById(req.body.campaign, function(err, campaign) {
          if (campaign.articles.indexOf(article._id) == -1) {
            campaign.articles.push(article)
            campaign.save();
          }
        })
      }

      // IF PUBLISHING - REMOVE ARTICLE FROM USER.DRAFTS
      console.log(req.body.published_at)
      if (req.body.published_at) {
        User.update({ _id: req.user }, { $pull : {drafts : article._id } }).exec(function(err, user) {
          console.log(user)
        })
      }
      res.status(200).json({ "message": "Article Saved Successfully" })
    });
  });

  // SHOW
  app.get('/api/articles/:id', function (req, res) {
    Article.findById(req.params.id).populate('campaign').exec(function(err, article) {
      if (err) { return res.status(404).send(err) };
      article.impression_count = article.impressions_count++
      article.save();
      
      res.status(200).json(article); 
    });
  });

  // UPDATE
  app.put('/api/articles/:id', function (req, res) {
    Article.findOneAndUpdate({ _id: req.params.id}, req.query.article, function (err, article) {
      if (err) { return res.send(err) }
      res.status(200).json(article)
    });
  });

  // DESTROY
  app.delete('/api/articles/:id', function (req, res) { 
    Article.findByIdAndRemove(req.params.id, function (err, article) {
      if (err) { return res.send(err) }
      res.status(200);
    });
  });
}