var seq = require('./data/sequelize');
var models = require('./data/models')
var express = require('express');
var router  = express.Router();

router.get('/latest/:type-:documentNumber', function(req, res) {

  models.Specification
    .findOne({
      include: [{
        model: models.Regulation
      }],
      where: {
        type: req.params.type.toUpperCase(),
        documentNumber: req.params.documentNumber
      },
      order: 'id DESC'
    })
    .then(function(specs) {
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
          description: req.body.description,
          createdBy: req.headers['x-iisnode-auth_user']
        })
        // try to save it ..
        .save( { transaction: t } )
        // whoohoo, new spec saved ..
        .then( function( spec ) {

          if(req.body.regulations) {
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
            });
          } else {
            return models.Specification
              .findById(spec.get( 'id' ), { transaction: t })
              .then(function(finalResult) {
                return finalResult
              });
          }
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
      if(transactionError.hasOwnProperty('errors')) {
        res.json(transactionError);
      } else {
        res.json({ errors: [{ path: 'system', message: 'an error occurred when attempting to save to the database' }] });
      }
    });
  }.bind(this), 2000);
});

module.exports = router;
