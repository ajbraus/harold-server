/*
 * CAMPAIGN MODEL
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CampaignSchema = new Schema({
    created_at          : { type: Date }
  , updated_at          : { type: Date }
  , published_at        : { type: Date }
  , title               : { type: String, required: true, trim: true }
  , summary             : { type: String, trim: true }
  , location            : { type: String, trim: true }
  , category            : { type: String }
  , goal_in_cents       : { type: Number }
  , img_url             : { type: String, trim: true }
  , video_url           : { type: String, trim: true }
  , impressions_count   : { type: Number, default: 0 }
  
  // REFERENCES

  // populate('user')
  , user          : { type: Schema.Types.ObjectId, ref: 'User' }

  // populate('articles') DONE
  , articles      : [{ type: Schema.Types.ObjectId, ref: 'Article' }]

  // populate('backings')
  // populate('backers')
});

// VIRTUAL ATTRIBUTES

//GOAL
CampaignSchema.virtual('goal').get(function () {
  var num = this.goal_in_cents
  var goal = (num/100).toFixed(2);
  goal = "$" + goal.toString()
  return goal;
}).set(function(goal_in_dollars) {
  var num = parseInt(goal_in_dollars)
  num = num * 100
  this.goal_in_cents = num
});

// PERCENT_BACKED
CampaignSchema.virtual('percent_backed').get(function () {
  // (goal_in_cents / 100).toFixed(2) / total backing / 100
  return 40;
})

// BEFORE/AFTER FILTER
CampaignSchema.pre('save', function(next){
  // SET CREATED_AT AND UPDATED_AT
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

// EXPORT POST MODEL
var Campaign = mongoose.model('Campaign', CampaignSchema);

module.exports = Campaign;
