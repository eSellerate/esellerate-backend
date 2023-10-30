import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'
import DbOptions from './dbOption.js'

const MercadolibreApp = sequelize.define('mercadolibre_auth', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  fk_mlapp: {
    type: DataTypes.STRING,
    allowNull: false
  },
  personal_token: {
    type: DataTypes.STRING
  },
  refresh_token: {
    type: DataTypes.STRING
  }
}, DbOptions)

export default MercadolibreApp
