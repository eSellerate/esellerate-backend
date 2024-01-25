import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

// relations
import User from './User.js'

const MessageRelevant = sequelize.define('message_relevant', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  order_id: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  text: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  freezeTableName: true,
  timestamps: false
})

// Relations
User.hasMany(MessageRelevant, { foreignKey: 'user_id', sourceKey: 'id' })
MessageRelevant.belongsTo(User, { foreignKey: 'user_id', sourceKey: 'id' })

export default MessageRelevant
