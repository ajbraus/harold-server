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
  , email         : { type: String, unique: true, lowercase: true }
  , password      : { type: String, select: false }
  , facebook      : { type: String }
  , twitter       : { type: String }
  , name          : {
      first       : { type: String, trim: true }
    , last        : { type: String, trim: true }    
  }
  , img_url       : { type: String, required: true, trim: true }
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
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });

  next();
});

// EXPORT POST MODEL
mongoose.model('User', UserSchema);
