import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

// relations
import User from './User.js'

const AnswersQuick = sequelize.define('answers_quick', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  keyword: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  answer: {
    type: DataTypes.STRING(350),
    allowNull: true
  }
}, {
  freezeTableName: true,
  timestamps: false
})

// Relations
User.hasMany(AnswersQuick, { foreignKey: 'user_id', sourceKey: 'id' })
AnswersQuick.belongsTo(User, { foreignKey: 'user_id', sourceKey: 'id' })

export default AnswersQuick
