
module.exports = function(sequelize, DataTypes) {
  var Regulation = sequelize.define('Regulation', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    code: { type: DataTypes.STRING(16) },
    name: { type: DataTypes.STRING(32) },
    shortDescription: { type: DataTypes.STRING(128) },
    longDescription: { type: DataTypes.STRING(1024) },
    regulatedBy: { type: DataTypes.STRING(32) },
    citationNumber: { type: DataTypes.STRING(16) },
    isTrainingRequired: { type: DataTypes.BOOLEAN },
    regulationText: { type: DataTypes.STRING(256) },
    requiredActivity: { type: DataTypes.STRING(1024) }
  }, {
    timestamps: true,
    paranoid: true,
    underscored: false,
    freezeTableName: false,
    classMethods: {
      associate: function(models) {
        Regulation.belongsToMany(models.Specification, { through: 'SpecificationsRegulations' });
      }
    }
  });

  return Regulation;
};
