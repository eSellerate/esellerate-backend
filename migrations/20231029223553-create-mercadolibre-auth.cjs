'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('mercadolibre_auth', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      personal_token: {
        type: Sequelize.STRING
      },
      refresh_token: {
        type: Sequelize.STRING
      }
    }, {
      timestamps: false,
      freezeTableName: true
    }).then(() => queryInterface.addConstraint('mercadolibre_auth', {
      fields: ['id'],
      type: 'foreign key',
      name: 'fk_user_id',
      references: {
        table: 'user',
        field: 'id'
      }
    }))
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('mercadolibre_auth')
  }
}
