/*
 * ARTICLE MODEL
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    created_at    : { type: Date }
  , updated_at    : { type: Date }
  , published_at  : { type: Date }
  , title         : { type: String, required: true, trim: true }
  , body          : { type: String, trim: true }
  , img_url       : { type: String, trim: true }

  // REFERENCES

  //populate('author')
  , author        : { type: Schema.Types.ObjectId, ref: 'User', required: true }

  //populate('campaign')
  , campaign      : { type: Schema.Types.ObjectId, ref: 'Campaign' }
  
});

// BEFORE/AFTER FILTER
ArticleSchema.pre('save', function(next){
  // SET CREATED_AT AND UPDATED_AT
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

// EXPORT POST MODEL
var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;