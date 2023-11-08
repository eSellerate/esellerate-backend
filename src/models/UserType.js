import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'
import DbOptions from './dbOption.js'

const UserType = sequelize.define('user_type', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  role: {
    type: DataTypes.STRING
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, DbOptions)

export default UserType
