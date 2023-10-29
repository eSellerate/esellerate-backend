'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      first_name: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      photo_url: {
        type: Sequelize.STRING,
        allowNull: true
      }
    },
    {
      timestamps: false,
      freezeTableName: true
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('user')
  }
}
