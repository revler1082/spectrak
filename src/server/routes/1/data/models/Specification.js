
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
        isIn: [['B', 'EO', 'EOP', 'MEP', 'MES', 'OJT', 'QA']],
        len: [1, 4]
      }
    },
    documentNumber: {
      type: DataTypes.STRING(16),
      allowNull: false,
      validate: {
        len: [1,16]
      }
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        len: [0,255]
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
      allowNull: true,
      validate: {
        len: [0,4]
      }
    },
    subSectionCode: {
      type: DataTypes.STRING(4),
      allowNull: true,
      validate: {
        len: [0,4]
      }
    },
    isDwg: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      validate: {
      }
    },
    drawingType: {
      type: DataTypes.INTEGER,
      allowNull: true      
    },
    readOnly: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      validate: {
      }      
    },
    createdBy: {
      type: DataTypes.STRING(128),
      allowNull: false,
      validate: {
        len: [0, 128]
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      validate: {
      }
    },
    author: {
      type: DataTypes.STRING(128),
      allowNull: true,
      validate: {
        len: [0, 128]        
      }
    },
    reviewedBy: {
      type: DataTypes.STRING(128),
      allowNull: true,
      validate: {
        len: [0, 128]        
      }
    },
    tlcCourse: {
      type: DataTypes.STRING(64),
      allowNull: true,
      validate: {
        len: [0, 64]        
      }
    },
    ceRequirements: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      validate: {
        len: [0, 1024]        
      }
    },    
    whoNeedsToComply: {
      type: DataTypes.STRING(256),
      allowNull: true,
      validate: {
        len: [0, 256]
      }
    },    
    parentSpecification: {
      type: DataTypes.STRING(16),
      allowNull: true,
      validate: {
        len: [0, 16]        
      }
    },
    comments: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      validate: {
        len: [0, 1024]        
      }
    },
    isCritical: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      validate: {
      }
    }    
  }, {
    timestamps: true,
    paranoid: true,
    underscored: false,
    freezeTableName: false,
    classMethods: {
      associate: function(models) {
        //Specification.belongsToMany(models.Regulation, { as: 'regulations', through: 'SpecificationsRegulations' });
        Specification.hasMany(models.AssociatedRegulation, { foreignKey: 'specificationId' });
        Specification.hasMany(models.ApplicableStandard, { foreignKey: 'specificationId' });
        Specification.belongsToMany(models.Specification, { as: 'associatedSpecifications', through: 'SpecificationAssociations', foreignKey: 'specificationId' });
      }
    }
  });

  return Specification;
};
