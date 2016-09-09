/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

var Sequelize = require('Sequelize');
var seq = require('../sequelize');

var Specification = seq.define('specification', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: Sequelize.STRING(4) },
    documentNumber: { type: Sequelize.STRING(8) },
    title: { type: Sequelize.STRING(128) },
    issueDate: { type: Sequelize.DATE(3) },
    sectionCode: { type: Sequelize.STRING(4) },
    hasDwg: { type: Sequelize.BOOLEAN },
    citationNumber: { type: Sequelize.STRING(16) },
    regulatedBy: { type: Sequelize.STRING(4) },
    description: { type: Sequelize.STRING(1024) }
  }, {
    timestamps: true,
    paranoid: true,
    underscored: false,
    freezeTableName: false
  });

Specification.sync({ force: false });

module.exports = Specification;
