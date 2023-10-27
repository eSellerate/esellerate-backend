'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('mercadolibre_app', {
      client_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      access_token: {
        type: Sequelize.STRING
      },
      client_secret: {
        type: Sequelize.STRING
      },
      refresh_token: {
        type: Sequelize.STRING
      }
    }, {
      timestamps: false,
      freezeTableName: true
    }).then(() => queryInterface.addConstraint('users', {
      fields: ['mercadolibre_client_id'],
      type: 'foreign key',
      name: 'fk_mercadolibre_client_id',
      references: {
        table: 'mercadolibre_app',
        field: 'client_id'
      }
    }))
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('users', 'fk_mercadolibre_client_id')
    await queryInterface.dropTable('mercadolibre_apps')
  }
}
