
module.exports = function(sequelize, DataTypes) {
  var Specification = sequelize.define('Specification', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.STRING(4) },
    documentNumber: { type: DataTypes.STRING(8) },
    title: { type: DataTypes.STRING(128) },
    issueDate: { type: DataTypes.DATE(3) },
    sectionCode: { type: DataTypes.STRING(4) },
    hasDwg: { type: DataTypes.BOOLEAN },
    citationNumber: { type: DataTypes.STRING(16) },
    regulatedBy: { type: DataTypes.STRING(4) },
    description: { type: DataTypes.STRING(1024) }
  }, {
    timestamps: true,
    paranoid: true,
    underscored: false,
    freezeTableName: false,
    classMethods: {
      associate: function(models) {
        Specification.belongsToMany(models.Regulation, { through: 'SpecificationsRegulations' });
      }
    }
  });

  return Specification;
};
