var seq = require('./data/sequelize');
var models = require('./data/models')
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

  if(req.query.id) {
    opts.where.id = req.query.id;
  }

  models.Specification.findAll(opts).then(function(specs) {
    res.json(specs);
  });
});

router.post('/', function(req, res) {

  setTimeout(function() {

    seq.transaction( function( t ) {

      return models.Specification
        .build({
          type: req.body.type,
          documentNumber: req.body.documentNumber,
          title: req.body.title,
          issueDate: req.body.issueDate,
          sectionCode: req.body.sectionCode,
          hasDwg: req.body.hasDwg,
          citationNumber: req.body.citationNumber,
          regulatedBy: req.body.regulatedBy,
          description: req.body.description
        })
        // try to save it ..
        .save( { transaction: t } )
        // whoohoo, new spec saved ..
        .then( function( spec ) {

          return models.Regulation.findAll({
            where: {
              id: {
                $in: req.body.regulations.map((currentValue) => currentValue.id)
              }
            },
            transaction: t
          }).then(function(associatedRegulations) {
            return spec
              .setRegulations( associatedRegulations, { transaction: t } )
              .then(function() {
                return models.Specification
                  .findById(spec.get( 'id' ), { transaction: t })
                  .then(function(finalResult) {
                    return finalResult
                  });
              });
          })
        });
        //.catch(function(err) {
        //  console.log('spec save err');
        //  console.log(err);
        //  return err;
        //});

    // all transactions are a go :)
    }).then( function( transactionResult ) {
        res.json( transactionResult.get( { plain: true } ) );
    // oops, big problem :(
    }).catch( function( transactionError ) {
      console.error(transactionError);
      res.json({ errors: [{ path: 'system', message: 'an error occurred when attempting to save to the database' }] });
    });
  }.bind(this), 2000);
});

module.exports = router;
