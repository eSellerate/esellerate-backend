import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

// relations
import Products from './Product.js'

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  photo_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  money: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false,
  freezeTableName: true
})

// Relations
User.hasMany(Products, { foreignKey: 'user_id', sourceKey: 'id' })
Products.belongsTo(User, { foreignKey: 'user_id', sourceKey: 'id' })

export default User
