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
  nickname: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
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
