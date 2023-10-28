import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

// relations
import Products from './Product.js'
import MercadolibreApp from './MercadolibreApp.js'
import UserType from './UserType.js'

const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  mercadolibre_client_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  photo_url: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  freezeTableName: true,
  timestamps: false
})

// Relations
User.hasMany(Products, { foreignKey: 'user_id', sourceKey: 'id' })
Products.belongsTo(User, { foreignKey: 'user_id', sourceKey: 'id' })
UserType.hasMany(User, { foreignKey: 'user_type_id', sourceKey: 'id' })
User.belongsTo(UserType, { foreignKey: 'user_type_id', sourceKey: 'id' })
MercadolibreApp.hasMany(User, { foreignKey: 'mercadolibre_client_id', sourceKey: 'client_id' })
User.belongsTo(MercadolibreApp, { foreignKey: 'mercadolibre_client_id', sourceKey: 'client_id' })

export default User
