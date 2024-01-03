import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'
import DbOptions from './DbOptions.js'

import MercadoLibreApp from './MercadolibreApp.js'

const MercadoLibreAuth = sequelize.define('mercadolibre_auth', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  personal_token: {
    type: DataTypes.STRING
  },
  refresh_token: {
    type: DataTypes.STRING
  }
}, DbOptions)

export default MercadoLibreAuth
