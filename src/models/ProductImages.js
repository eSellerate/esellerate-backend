import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

const ProductImages = sequelize.define('product_images', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
{
  timestamps: false,
  freezeTableName: true
})

export default ProductImages
