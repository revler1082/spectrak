//var seq = require('./data/sequelize');
var models = require('./data/models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {

  var include = [];
  var whereClause = { isActive: true };
  if(req.query.id) { whereClause.id = req.query.id; }
  if(req.query.ias) { include.push({ model: models.Specification, as: 'associatedSpecifications' }); }
  if(req.query.iapst) { include.push({ model: models.ApplicableStandard }); }  
  if(req.query.iar) {
    var ar =  { model: models.AssociatedRegulation };
    if(req.query.iarp) { ar.include = models.AssociatedRegulationPart };  
    include.push(ar);
  }
  
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
      include,
      order: [ ['updatedAt', 'desc'] ]
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

    models.sequelize.transaction( function( t ) {

      var newSpec = null;
      return models.Specification
        .build({
          type: req.body.type,
          documentNumber: req.body.documentNumber,
          title: req.body.title,
          issueDate: req.body.issueDate,
          sectionCode: req.body.sectionCode,
          subSectionCode: req.body.sectionCode,
          isDwg: req.body.isDwg,
          drawingType: req.body.drawingType,
          readOnly: req.body.readOnly,
          createdBy: req.headers['x-iisnode-auth_user'],
          isActive: true,
          author: req.body.author,
          reviewedBy: req.body.reviewedBy,
          tlcCourse: req.body.tlcCourse,
          ceRequirements: req.body.ceRequirements,
          whoNeedsToComply: req.body.whoNeedsToComply,
          parentSpecification: req.body.parentSpecification,
          comments: req.body.comments,
          isCritical: req.body.isCritical
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
          var promises = []
          if(!req.body.associatedRegulations) req.body.associatedRegulations = [];
          req.body.associatedRegulations.forEach(function(currentValue, index) {
            
            var a = {
              regulatedBy: currentValue.regulatedBy, 
              citationNumber: currentValue.citationNumber,
              name: currentValue.name,
              description: currentValue.description,
              isTrainingRequired: currentValue.isTrainingRequired,
              orderText: currentValue.orderText,
              activityDescription: currentValue.activityDescription,
              complianceAction: currentValue.complianceAction,
              specificationId: newSpec.id,
              AssociatedRegulationParts: []
            };
            
            if(currentValue.AssociatedRegulationParts) {
              currentValue.AssociatedRegulationParts.forEach(function(arp, arpIdx) {
                a.AssociatedRegulationParts.push({
                  orderText: arp.orderText
                });
              });
            }
            
            promises.push(models.AssociatedRegulation.create(a, { include: [models.AssociatedRegulationPart], transaction: t }));
          });
          
          return models.Sequelize.Promise.all(promises);
        })
        .then(function() {
          var promises = []
          if(!req.body.applicableStandards) req.body.applicableStandards = [];
          req.body.applicableStandards.forEach(function(currentValue, index) {
            
            var a = {
              name: currentValue.name, 
              citation: currentValue.citation,
              code: currentValue.code,
              sectionReference: currentValue.sectionReference,
              specificationId: newSpec.id
            };
            
            promises.push(models.ApplicableStandard.create(a, { transaction: t }));
          });

          return models.Sequelize.Promise.all(promises);
        })
        .then(function() {
          if(req.body.associatedSpecifications && req.body.associatedSpecifications.length > 0) {
            return models.Specification.findAll({
              where: {
                id: {
                  $in: req.body.associatedSpecifications.map((currentValue) => currentValue.id)
                }
              },
              transaction: t
            });
          } else {
            return null;
          }
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
        res.json({ errors: [{ path: 'system', message: 'an error occurred when attempting to save to the database ' }] });
      }
    });
  }.bind(this), 2000);
});

module.exports = router;

