import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'
import DbOptions from './DbOptions.js'

const MessageType = sequelize.define('message_type', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  description: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, DbOptions)

export default MessageType
