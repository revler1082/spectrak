var logger = require('morgan');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var apiVersion = 1;
var config = require('./config');
var models = require('./routes/' + apiVersion + '/data/models');
var specifications = require('./routes/' + apiVersion + '/SpecificationRoute');
var regulations = require('./routes/' + apiVersion + '/RegulationRoute');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// when in dev mode, have a auth-user
if(process.env.NODE_ENV === 'development') {
  app.use(function(req, res, next) {
    req.headers['x-iisnode-auth_user'] = 'CONED\\AHMETAJD';
    next()
  });
}

// configure app to serve static files..
app.use(config.siteRoot + '', express.static(__dirname + '/www'));

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

app.use(config.siteRoot + 'api/' + apiVersion, router);
app.use(config.siteRoot + 'api/' + apiVersion + '/specifications', specifications);
app.use(config.siteRoot + 'api/' + apiVersion + '/regulations', regulations);

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
  models.sequelize.sync({ force: false }).then(function () {
    app.listen(port, function () {
      console.log('Magic happens on port ' + port);
    });
    //server.on('error', onError);
    //server.on('listening', onListening);
  });
}

module.exports = app;
