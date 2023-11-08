'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user_type', [
      {
        role: 'admin',
        name: 'Administrador',
        description: 'Este rol es el de mayor jerarquia, tienes que tener cuidado con los permisos que le das a este rol'
      },
      {
        role: 'seller',
        name: 'Vendedor',
        description: 'El usuario con este rol puede crear productos, editarlos y eliminarlos.'
      },
      {
        role: 'designer',
        name: 'Diseñador',
        description: 'El usuario con este rol puede crear diseños, editarlos y eliminarlos.'
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user-type', null, {})
  }
}
