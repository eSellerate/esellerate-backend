'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Mercadolibre_auth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Mercadolibre_auth.init({
    id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    fk_mlapp: DataTypes.STRING,
    personal_token: DataTypes.STRING,
    refresh_token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'mercadolibre_auth'
  })
  return Mercadolibre_auth
}
