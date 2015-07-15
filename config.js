module.exports = {
  ENVIRONMENT: require('./env/' + process.env.NODE_ENV + '.js'),
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'hominahominahomina',
  
  FACEBOOK_SECRET: process.env.FACEBOOK_SECRET || 'Facebook Client Secret',
  TWITTER_KEY: process.env.TWITTER_KEY || 'Twitter Consumer Key',
  TWITTER_SECRET: process.env.TWITTER_SECRET || 'Twitter Consumer Secret',
  TWITTER_CALLBACK: process.env.TWITTER_CALLBACK || 'Twitter Callback URL',

  YAHOO_SECRET: process.env.YAHOO_SECRET || 'Yahoo Client Secret',
  FOURSQUARE_SECRET: process.env.FOURSQUARE_SECRET || 'Foursquare Client Secret',
  GOOGLE_SECRET: process.env.GOOGLE_SECRET || 'Google Client Secret',
  GITHUB_SECRET: process.env.GITHUB_SECRET || 'GitHub Client Secret',
  LINKEDIN_SECRET: process.env.LINKEDIN_SECRET || 'LinkedIn Client Secret',
  WINDOWS_LIVE_SECRET: process.env.WINDOWS_LIVE_SECRET || 'Windows Live Secret'
};