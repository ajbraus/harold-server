/*
 * Article Resource
 */

var Article = require('mongoose').model('Article');
var Campaign = require('mongoose').model('Campaign');

module.exports = function(app) {
  app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });

  // ARTICLES INDEX
  app.get('/api/articles', function (req, res) {
    Article.find().sort('-created_at').exec(function(err, articles) {
      if (err) { return res.status(404).send(err) };

      res.status(200).json(articles); // return all nerds in JSON format
    });
  });

  // CAMPAIGNS INDEX
  app.get('/api/campaigns', function (req, res) {
    Campaign.find().sort('-created_at').exec(function(err, campaigns) {
      if (err) { return res.status(404).send(err) };
      
      res.status(200).json(campaigns); // return all nerds in JSON format
    });
  });

  app.get('/api/campaigns/:id', function (req, res) {
    console.log(req.params.id)
    Campaign.findOne({ _id: req.params.id }).exec(function(err, campaign) {
      if (err) { return res.status(404).send(err) };
      
      res.status(200).json(campaign); // return all nerds in JSON format
    });
  });

  // CREATE
  app.post('/api/articles', function (req, res) {
    var article = new Article({
        body: req.body.body
    });
    console.log(article);
    article.save(function (err, article) {
      console.log('article saved')
      if (err) { return res.send(err) };
      res.status(201); 
      io.sockets.emit('article.published', article);
    });
  });

  // SHOW
  app.get('/api/articles/:id', function (req, res) {
    Article.findById(req.params.id, function(err, article) {
      console.log('blah')
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