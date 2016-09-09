var Sequelize = require('sequelize');

var sequelize = new Sequelize(
  'FIS_CONED',
  'netstorm_ro',
  'netstorm_ro',
  {
    host: 'SQLDEN12R4E01',
    dialect :'mssql',
    define: {
      schema: "spectrak"
    }//,
    //logging: config.debug
  }
);

module.exports = sequelize;
