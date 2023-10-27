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
    }).then(() => queryInterface.addConstraint('user', ['user_type_id'], {
      type: 'FOREIGN KEY',
      name: 'id',
      references: {
        table: 'user',
        field: 'user_type_id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    }))
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('user_type')
  }
}
