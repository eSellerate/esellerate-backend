'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('item', {
      id: {
        type: Sequelize.STRING(11),
        allowNull: false,
        primaryKey: true
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      stock_ml: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      stock_ml_restore: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      stock_enable: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      fk_design: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    }).then(() => queryInterface.addConstraint('message', {
      fields: ['fk_product_id'],
      type: 'foreign key',
      name: 'fk_product_id',
      references: {
        table: 'item',
        field: 'id'
      }
    })).then(() => queryInterface.addConstraint('item', {
      fields: ['fk_design'],
      type: 'foreign key',
      name: 'fk_design_id',
      references: {
        table: 'design',
        field: 'id'
      }
    }))
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('message', 'fk_product_id')
    await queryInterface.dropTable('item')
  }
}
