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
    Article.find().sort('-created_at').exec(function(err, articles) {
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
          user.drafts.push(article);
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
      res.status(200).json({ "message": "Article Saved Successfully" })
    });
  });

  // SHOW
  app.get('/api/articles/:id', function (req, res) {
    Article.findById(req.params.id).populate('campaign').exec(function(err, article) {
      if (err) { return res.status(404).send(err) };
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