import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'
import DbOptions from './DbOptions.js'

const MercadolibreApp = sequelize.define('mercadolibre_app', {
  client_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  client_secret: {
    type: DataTypes.STRING,
    allowNull: false
  },
  redirect_url: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, DbOptions)

export default MercadolibreApp
