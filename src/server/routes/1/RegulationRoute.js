var models = require('./models');

module.exports = {

  get: function (req, res) {
    //if(config.debug) {
    //  req.headers['x-iisnode-auth_user'] = 'CONED\\AHMETAJD';
    //}

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

    models.Regulation.findAll(opts).then(function(specs) {
      res.json(specs);
    });
  }
  /*
  post: function (req, res) {
    //if(config.debug) {
    //  req.headers['x-iisnode-auth_user'] = 'CONED\\AHMETAJD';
    //}
    setTimeout(function() {
      seq.transaction( function( t ) {

        return Specification
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
          // whoohoo, new request saved ..
          .then( function( r ) {
            return r;
          });
      // all transactions are a go :)
      }).then( function( transactionResult ) {
          //console.log('HELLO');
          res.json( transactionResult.get( { plain: true } ) );
      // something went wrong :(
      }).catch( function( transactionError ) {
        // something went wrong database side,
        // not just validation..
        //if( transactionError instanceof Error ) {
        //  res.json({
        //    errors: [{
        //      message: transactionError.message,
        //      path: 'system'
        //    }]
        //  });
        //} else { // validation errors..
          res.json( transactionError );
        //}
      });
    }.bind(this), 2000);

  }
  */

};
