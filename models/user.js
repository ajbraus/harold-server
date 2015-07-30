/*
 * ARTICLE MODEL
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcryptjs')

var UserSchema = new Schema({
    created_at    : { type: Date }
  , updated_at    : { type: Date }
  , handle        : { type: String }
  , email         : { type: String, unique: true, select: false, lowercase: true, required: true } // match: /\S+@\S+\.\S+/
  , confirmed     : { type: Boolean, default: false }
  , password      : { type: String, select: false, required: true }
  , bio           : { type: String }
  , facebook      : { type: String }
  , location      : { type: String }
  , twitter       : { type: String }
  , name          : {
      first       : { type: String, trim: true }
    , last        : { type: String, trim: true }    
  }
  , img_url       : { type: String, trim: true }

  //REFERENCES
  , drafts        : [{ type: Schema.Types.ObjectId, ref: 'Article' }]
  //user.articles = Article.find({ author: user._id });
  //populate('campaigns')
  , campaigns     : [{ type: Schema.Types.ObjectId, ref: 'Campaign' }]
});

// VIRTUAL ATTRIBUTES
UserSchema.virtual('name.full').get(function () {
  return this.name.first + ' ' + this.name.last;
}).set(function(name) {
  var split = name.split(' ');
  this.name.first = split[0];
  this.name.last = split[1];
});

// BEFORE/AFTER FILTER
UserSchema.pre('save', function(next){
  var user = this;
  // SET CREATED_AT AND UPDATED_AT
  now = new Date();
  user.updated_at = now;
  if ( !user.created_at ) {
    user.created_at = now;
  }

  // ENCRYPT PASSWORD
  if (!user.isModified('password')) {
    console.log('password not motified')
    return next();
  }
  
  console.log('password not motified')
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      console.log(hash)
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(password, done) {
  console.log(password)
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

// EXPORT POST MODEL
var User = mongoose.model('User', UserSchema);

module.exports = User;
