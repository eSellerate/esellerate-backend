import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'
import DbOptions from './dbOption.js'

const UserType = sequelize.define('user_type', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, DbOptions)

export default UserType
