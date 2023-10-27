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
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('mercadolibre_apps')
  }
}
