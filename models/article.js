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
  , topic         : { type: String, required: true, trim: true }
  , body          : { type: String, required: true, trim: true }
  , img_url       : { type: String, required: true, trim: true }
  // campaign
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

  // ENCRYPT PASSWORD
  if (this.password) {
    var md5 = crypto.createHash('md5');
    this.password = md5.update(this.password).digest('hex');
  }
  next();
});

// EXPORT POST MODEL
mongoose.model('Article', ArticleSchema);
