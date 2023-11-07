'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_type', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    }).then(() => queryInterface.addConstraint('user', {
      fields: ['user_type_id'],
      type: 'foreign key',
      name: 'fk_user_type_id',
      references: {
        table: 'user_type',
        field: 'id'
      }
    }))
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('user', 'fk_user_type_id')
    await queryInterface.dropTable('user_type')
  }
}
