'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        user_type_id: 1,
        mercadolibre_client_id: '0',
        username: 'root',
        email: 'root@root.com',
        password: '123',
        first_name: 'root',
        last_name: 'root',
        photo_url: 'https://i1.sndcdn.com/artworks-ywcx1pUzUGGvjwmH-BUNWRA-t500x500.jpg'
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
}
