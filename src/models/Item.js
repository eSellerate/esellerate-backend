import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'
import DbOptions from './DbOptions.js'

const Item = sequelize.define('item', {
  id: {
    type: DataTypes.STRING(11),
    allowNull: false,
    primaryKey: true
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  stock_ml: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  stock_ml_restore: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  stock_enable: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  fk_design: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, DbOptions)

export default Item
