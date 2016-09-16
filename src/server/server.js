var bluebird = require('bluebird');
var logger = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
//var express = require('express');
var apiVersion = 1;
var models = require('./routes/' + apiVersion + '/data/models');
var specifications = require('./routes/' + apiVersion + '/SpecificationRoute');
var regulations = require('./routes/' + apiVersion + '/RegulationRoute');

// when in dev mode, have a auth-user
process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.NODE_ENV = process.env.NODE_ENV.trim();
if(process.env.NODE_ENV.indexOf('dev') >= 0) process.env.NODE_ENV = 'development';

// get the right config ..
var config = require('./config')[process.env.NODE_ENV];

// view engine setup
var express = require('express');
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

if(process.env.NODE_ENV === 'development') {
  console.log('in development mode DION does everything!');
  app.use(function(req, res, next) {
    req.headers['x-iisnode-auth_user'] = 'CONED\\AHMETAJD';
    next();
  });
}

// single page-app
//app.use('/', function(req, res) {
//  res.render('index', {
//    title: 'Sequelize: Express Example',
//    users: users
//  });
//})

// configure app to serve static files..
app.use(config.express.siteRoot + '', express.static(__dirname + '/www'));

// configure logging, parsing, and favicon..
//app.use(favicon(__dirname + '/public/favicon.ico'));
if(app.get('env') === 'development') { app.use(logger('dev')) };
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// api setup
var router = express.Router();
router.get('/', function(req, res) {
    res.json({ message: 'welcome to the spectrak api! (v' + apiVersion + ')' });
});

app.use(config.express.siteRoot + 'api/' + apiVersion, router);
app.use(config.express.siteRoot + 'api/' + apiVersion + '/specifications', specifications);
app.use(config.express.siteRoot + 'api/' + apiVersion + '/regulations', regulations);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  });
});

if(!module.parent || process.env.NODE_ENV === 'production') {
  var port = process.env.PORT || 3000;
  models.sequelize.sync({ force: config.forceSync }).then(function () {
    if(config.debug && config.sequelize.forceSync) {
      var testSpecs = models.Specification.bulkCreate(config.sequelize.initialData.specifications);
      var testRegs = models.Regulation.bulkCreate(config.sequelize.initialData.regulations);
      bluebird.join(
        testSpecs,
        testRegs,
        function() {
          console.log('populated test data');
          app.listen(port, function () {
            console.log('Magic happens on port ' + port);
          });
        }
      );
    } else {
      app.listen(port, function () {
        console.log('Magic happens on port ' + port);
      });
    }
  });
}

module.exports = app;
