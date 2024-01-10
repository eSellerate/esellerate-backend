import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

// relations
import User from './User.js'
import MessageType from './MessageType.js'

const AnswersAutoGeneral = sequelize.define('answers_auto_general', {
  type: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  text: {
    type: DataTypes.STRING(350),
    allowNull: true
  }
}, {
  freezeTableName: true,
  timestamps: false
})

// Relations
User.hasMany(AnswersAutoGeneral, { foreignKey: 'user_id', sourceKey: 'id' })
AnswersAutoGeneral.belongsTo(User, { foreignKey: 'user_id', sourceKey: 'id' })

MessageType.hasMany(AnswersAutoGeneral, { foreignKey: 'type', sourceKey: 'id' })
AnswersAutoGeneral.belongsTo(MessageType, { foreignKey: 'type', sourceKey: 'id' })

export default AnswersAutoGeneral
