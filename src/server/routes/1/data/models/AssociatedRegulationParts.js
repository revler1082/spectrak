
module.exports = function(sequelize, DataTypes) {
  var AssociatedRegulationPart = sequelize.define('AssociatedRegulationPart', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    section: { type: DataTypes.STRING(8) },
    description: { type: DataTypes.STRING(1024) },    
  }, {
    timestamps: true,
    paranoid: true,
    underscored: false,
    freezeTableName: false,
    classMethods: {
      associate: function(models) {
        AssociatedRegulationPart.belongsTo(models.AssociatedRegulation, { foreignKey: 'associatedRegulationId' });
      }
    }
  });

  return AssociatedRegulationPart;
};
