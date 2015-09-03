/*
 * SERVER.JS
 */

var express = require('express')
  , app = express()
  , path = require('path')
  , bodyParser = require('body-parser')
  , cors = require('cors')
  , mongoose = require('mongoose')
  , routes = require('./routes')

if (process.env.PORT) {
  var config = process.env;
} else {
  var config = require('./config');
};

mongoose.connect(config.MONGOLAB_URI);
require('./models/article');
require('./models/campaign');
require('./models/user');

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GRAB PUBLIC FOLDER WITH ANGULAR APP
app.use("/", express.static(path.join(__dirname, 'public')));

// VIEW ENGINE
app.set('views', path.join(__dirname, 'views'));
// USE JADE AS TEMPLATING ENGINE
app.set('view engine', 'jade');
app.set('view options', {
  layout: false
});

// SET ROUTES
app.get('/', routes.index);
app.get('/templates/:name', routes.templates);
require('./routes/articles')(app);
require('./routes/campaigns')(app);
require('./routes/auth')(app);
require('./routes/users')(app);
require('./routes/search')(app);

// REDIRECT ALL OTHER PATHS TO INDEX (HTML5 history)
app.get('*', routes.index);

app.listen(config.PORT)


