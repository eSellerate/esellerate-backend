'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('design', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING(50)
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('item', 'fk_fk_design')
    await queryInterface.dropTable('design')
  }
}
