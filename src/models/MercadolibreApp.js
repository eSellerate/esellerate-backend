import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'
import DbOptions from './dbOption.js'

const MercadolibreApp = sequelize.define('mercadolibre_app', {
  client_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  access_token: {
    type: DataTypes.STRING,
    allowNull: false
  },
  client_secret: {
    type: DataTypes.STRING,
    allowNull: false
  },
  refresh_token: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, DbOptions)

export default MercadolibreApp
