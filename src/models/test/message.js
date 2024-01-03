const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('message', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fk_product_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'message_type',
        key: 'id'
      }
    },
    text: {
      type: DataTypes.STRING(350),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'message',
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
        name: "fk_product_id",
        using: "BTREE",
        fields: [
          { name: "fk_product_id" },
        ]
      },
      {
        name: "fk_message_id",
        using: "BTREE",
        fields: [
          { name: "type" },
        ]
      },
    ]
  });
};
