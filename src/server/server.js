var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var apiVersion = 1;
var config = require('./config');

app.set('view engine', 'jade');

// configure app to serve static files..
app.use(config.siteRoot + '', express.static(__dirname + '/www'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES FOR OUR API
// update this later to read routes directory and automagically create ..
// =============================================================================
var router = express.Router();

// test route to make sure everything is working
// (accessed at GET http://localhost:8080/api)
router.get(config.siteRoot, function(req, res) {
    res.json({ message: 'welcome to the spectrak api! (v' + apiVersion + ')' });
});

//router.route('/users/me')
//  .get(require('./routes/' + apiVersion + '/UsersRoute').me)

router.route('/specifications')
  .get(require('./routes/' + apiVersion + '/SpecificationRoute').get)
  .post(require('./routes/' + apiVersion + '/SpecificationRoute').post);  

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use(config.siteRoot + 'api/' + apiVersion, router);

// index view..
//app.get(config.siteRoot, function(req, res) {
//  res.render(path.join(__dirname, '/views/index'));
//});

if(!module.parent || !config.debug) {
  var port = process.env.PORT || 3000;
  app.listen(port, function () {
    console.log('Magic happens on port ' + port);
  });
}

module.exports = app;
