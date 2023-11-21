import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'
import DbOptions from './DbOptions.js'

const Message = sequelize.define('message', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  fk_product_id: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  text: {
    type: DataTypes.STRING(350),
    allowNull: false
  }
}, DbOptions)

export default Message
