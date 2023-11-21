import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'
import DbOptions from './DbOptions.js'

const Design = sequelize.define('design', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, DbOptions)

export default Design