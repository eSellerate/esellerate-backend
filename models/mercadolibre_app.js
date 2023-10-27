'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class mercadolibre_app extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  mercadolibre_app.init({
    client_id: DataTypes.STRING,
    access_token: DataTypes.STRING,
    client_secret: DataTypes.STRING,
    refresh_token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'mercadolibre_app'
  })
  return mercadolibre_app
}
