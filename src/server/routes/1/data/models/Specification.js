
module.exports = function(sequelize, DataTypes) {
  var Specification = sequelize.define('Specification', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.STRING(4),
      allowNull: false,
      validate: {
        isIn: [['EO', 'EOP', 'B']],
        len: [1,4]
      }
    },
    documentNumber: {
      type: DataTypes.STRING(8),
      allowNull: false,
      validate: {
        len: [1,8]
      }
    },
    title: {
      type: DataTypes.STRING(128),
      allowNull: false,
      validate: {
        len: [1,128]
      }
    },
    issueDate: {
      type: DataTypes.DATE(3),
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    sectionCode: {
      type: DataTypes.STRING(4),
      allowNull: false,
      validate: {
        len: [1,4]
      }
    },
    hasDwg: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      validate: {
      }
    },
    citationNumber: {
      type: DataTypes.STRING(16),
      allowNull: false,
      validate: {
        len: [1, 16]
      }
    },
    regulatedBy: {
      type: DataTypes.STRING(4),
      allowNull: false,
      validate: {
        isIn: [['PSC', 'NESC']],
        len: [1, 4]
      }
    },
    description: {
      type: DataTypes.STRING(1024),
      allowNull: false,
      validate: {
        len: [1, 1024]
      }
    },
    createdBy: {
      type: DataTypes.STRING(128),
      allowNull: false,
      validate: {
        len: [1, 128]
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      validate: {
      }
    }
    /*,
    updatedBy: {
      type: DataTypes.STRING(128),
      allowNull: true,
      validate: {
        len: [1, 128]
      }
    }*/
  }, {
    timestamps: true,
    paranoid: true,
    underscored: false,
    freezeTableName: false,
    classMethods: {
      associate: function(models) {
        Specification.belongsToMany(models.Regulation, { as: 'regulations', through: 'SpecificationsRegulations' });
        Specification.belongsToMany(models.Specification, { as: 'associatedSpecifications', through: 'SpecificationAssociations' })
      }
    }
  });

  return Specification;
};
