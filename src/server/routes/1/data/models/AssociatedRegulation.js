
module.exports = function(sequelize, DataTypes) {
  var AssociatedRegulation = sequelize.define('AssociatedRegulation', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    citationNumber: { type: DataTypes.STRING(16) },
    regulatedBy: { type: DataTypes.STRING(4) },
    name: { type: DataTypes.STRING(64) },
    description: { type: DataTypes.STRING(1024) },
    isTrainingRequired: { type: DataTypes.BOOLEAN, allowNull: true },
    activityDescription: { type: DataTypes.STRING(256), allowNull: true },
    complianceAction: { type: DataTypes.STRING(256), allowNull: true }    
  }, {
    timestamps: true,
    paranoid: true,
    underscored: false,
    freezeTableName: false,
    classMethods: {
      associate: function(models) {
        AssociatedRegulation.hasMany(models.AssociatedRegulationPart, { foreignKey: 'associatedRegulationId' });
      }
    }
  });

  return AssociatedRegulation;
};
