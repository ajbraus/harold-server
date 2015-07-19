/*
 * SEARCH API ROUTES
 */


var User = require('../models/user');
var Article = require('../models/article');
var Campaign = require('../models/campaign');

module.exports = function(app) {
  app.post('/api/search', function (req, res) {
    console.log('searching articles')
    Article.find(
       { $text : { $search : req.body.query } },
       { score : { $meta: "textScore" } }
      )
      .sort({ score : { $meta : 'textScore' } })
      .sort("-_id")
      .exec(function(err, results) {
        console.log(results)
        res.status(200).json(results); 
      });
  });
}