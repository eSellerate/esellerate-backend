import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

// relations
import ProductImages from './ProductImages.js'

const Product = sequelize.define('product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  album_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  available: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  cover: {
    type: DataTypes.STRING,
    allowNull: false
  },
  new: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, { freezeTableName: true })

// Relations
Product.hasMany(ProductImages, { foreignKey: 'product_id', sourceKey: 'id' })
ProductImages.belongsTo(Product, { foreignKey: 'product_id', sourceKey: 'id' })

export default Product
