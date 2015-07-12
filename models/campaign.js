/*
 * CAMPAIGN MODEL
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CampaignSchema = new Schema({
    created_at    : { type: Date }
  , updated_at    : { type: Date }
  , published_at  : { type: Date }
  , title         : { type: String, required: true, trim: true }
  , summary       : { type: String, trim: true }
  , location      : { type: String, trim: true }
  , topics        : { type: Array }
  , goal_in_cents : { type: Number }
  , img_url       : { type: String, trim: true }
  , video_url     : { type: String, trim: true }
  // has_many articles
  // belongs_to user
  // has_many backings
  // has_many backers through backings
});

// virtual attributes
// goal
// percent_backed
// 

// BEFORE/AFTER FILTER
CampaignSchema.pre('save', function(next){
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
mongoose.model('Campaign', CampaignSchema);
