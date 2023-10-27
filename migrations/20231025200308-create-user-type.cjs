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
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    }).then(() => queryInterface.addConstraint('users', {
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
    await queryInterface.removeConstraint('users', 'fk_user_type_id')
    await queryInterface.dropTable('user_type')
  }
}
