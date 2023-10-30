import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

// relations
import MercadoLibreAuth from './MercadoLibreAuth.js'
import UserType from './UserType.js'

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING(20),
    allowNull: true
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
    type: DataTypes.STRING(30),
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING(30),
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
UserType.hasMany(User, { foreignKey: 'user_type_id', sourceKey: 'id' })
User.belongsTo(UserType, { foreignKey: 'user_type_id', sourceKey: 'id' })
User.hasOne(MercadoLibreAuth, { foreignKey: 'id', sourceKey: 'id' })

export default User
