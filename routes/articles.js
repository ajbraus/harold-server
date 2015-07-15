/*
 * articles.js
 */

var Article = require('mongoose').model('Article');

module.exports = function(app) {
  // ARTICLES INDEX
  app.get('/api/articles', function (req, res) {
    Article.find().sort('-created_at').exec(function(err, articles) {
      if (err) { return res.status(404).send(err) };

      res.status(200).json(articles); // return all nerds in JSON format
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