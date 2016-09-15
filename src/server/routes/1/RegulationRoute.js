var seq = require('./data/sequelize');
var models = require('./data/models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {

    var opts = {
      include: [
        // nothing so far..
      ],
      where: {

      }
    };

    if(req.query.id) { opts.where.id = req.query.id; }

    if(req.query.contains && req.query.contains.length > 0) {
      req.query.contains = req.query.contains.replace('%', '');
      req.query.contains = req.query.contains.toLowerCase();
      //opts.where.name = { $like: '%' + req.query.contains + '%' };
      opts.where.name = seq.where(seq.fn('lower', seq.col('name')), 'like', '%' + req.query.contains + '%');
    }

    var limit = 5;
    if(req.query.limit && !isNaN(req.query.limit)) { limit = req.query.limit; }
    opts.limit = limit;

    models.Regulation.findAll(opts).then(function(specs) {
      res.json(specs);
    });
});

module.exports = router;
