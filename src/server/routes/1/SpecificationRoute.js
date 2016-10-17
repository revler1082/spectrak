var seq = require('./data/sequelize');
var models = require('./data/models')
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {

  var include = [];
  var whereClause = { isActive: true };
  if(req.query.id) { whereClause.id = req.query.id; }
  if(req.query.include_regs) { include.push({ model: models.Regulation, as: 'regulations' }); }
  if(req.query.include_assoc_specs) { include.push({ model: models.Specification, as: 'associatedSpecifications' }); }
  if(req.query.q) { 
    whereClause['$or'] = [
      { documentNumber: { $like: '%' + req.query.q + '%' }}, 
      {sectionCode: { $like: '%' + req.query.q + '%'}}
    ]; 
  }

  models.Specification
    .findAndCountAll({
      where: whereClause,
      limit: req.query.limit ? parseInt(req.query.limit) : 10,
      offset: req.query.offset ? parseInt(req.query.offset) : 0,
      include
    })
    .then(function(specs) {
      res.json(specs);
    });
});

router.get('/latest/:type-:documentNumber', function(req, res) {

  models.Specification
    .findOne({
      include: [{
        model: models.Regulation,
        model: models.Specifications
      }],
      where: {
        type: req.params.type.toUpperCase(),
        documentNumber: req.params.documentNumber,
        isActive: true
      }
    })
    .then(function(specs) {
      res.json(specs);
    });
});

router.post('/', function(req, res) {

  setTimeout(function() {

    seq.transaction( function( t ) {

      var newSpec = null;
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
          createdBy: req.headers['x-iisnode-auth_user'],
          isActive: true
        })
        // try to save it ..
        .save( { transaction: t } )
        // whoohoo, new spec saved ..
        .then( function( spec ) {          

          // make all other records inactive for the same document # - type
          newSpec = spec;
          return models.Specification.update({
            isActive: false
          }, {
            where: {
              documentNumber: spec.get('documentNumber'),
              type: spec.get('type'),
              id: {
                $ne: spec.get('id')
              }
            },
            transaction: t
          });
           
        })
        .spread(function(affectedCount, affectedRows) {
          // fake it till you make it?
          if(!req.body.regulations) req.body.regulations = [];
          var notInDbRegs = req.body.regulations
            .filter((e) => e.id < 0)
            .forEach(function(currentValue, index) {
              return {
                code: currentValue.name, 
                name: currentValue.name, 
                shortDescription: currentValue.name, 
                longDescription: currentValue.name, 
                regulatedBy: '', 
                citationNumber: '', 
                isTrainingRequired: false,
                regulationText: '', 
                requiredActivity: ''
              };
            });
          
          return models.Regulation
            .bulkCreate(notInDbRegs)
            .then(function() {
              return models.Regulation.findAll({
                where: {
                  id: {
                    $in: req.body.regulations.map((currentValue) => currentValue.id)
                  }
                },
                transaction: t
              });
            });
        })
        .then(function(associatedRegulations) {

          return newSpec.setRegulations( associatedRegulations, { transaction: t } )

        })
        .then(function() {
          return models.Specification.findAll({
            where: {
              id: {
                $in: req.body.associatedSpecifications.map((currentValue) => currentValue.id)
              }
            },
            transaction: t
          });
          
        })
        .then(function(associatedSpecifications) {
          return newSpec
            .setAssociatedSpecifications( associatedSpecifications, { transaction: t } )
        })
        .then(function() {
          return models.Specification
            .findById(newSpec.get( 'id' ), { transaction: t })
            .then(function(finalResult) {
              return finalResult
            });
        })
    
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

