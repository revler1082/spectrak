
module.exports = function(sequelize, DataTypes) {
  var ApplicableStandard = sequelize.define('ApplicableStandard', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(32) },
    citation: { type: DataTypes.STRING(256) },
    code: { type: DataTypes.STRING(256) }    
  }, {
    timestamps: true,
    paranoid: true,
    underscored: false,
    freezeTableName: false,
    classMethods: {
      associate: function(models) {

      }
    }
  });

  return ApplicableStandard;
};
