const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('item', {
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
      allowNull: false,
      references: {
        model: 'design',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'item',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_design_id",
        using: "BTREE",
        fields: [
          { name: "fk_design" },
        ]
      },
    ]
  });
};
