'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('mercadolibre_app', [
      {
        client_id: '0',
        access_token: '0',
        client_secret: '0',
        refresh_token: '0'
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('mercadolibre_app', null, {})
  }
}
