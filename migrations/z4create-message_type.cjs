'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('message_type', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING(50)
      }
    }).then(() => queryInterface.addConstraint('message', {
      fields: ['type'],
      type: 'foreign key',
      name: 'fk_message_id',
      references: {
        table: 'message_type',
        field: 'id'
      }
    }))
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('message', 'fk_message_id')
    await queryInterface.dropTable('message_type')
  }
}
