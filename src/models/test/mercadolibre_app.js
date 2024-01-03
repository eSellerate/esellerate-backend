const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mercadolibre_app', {
    client_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    client_secret: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    redirect_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'mercadolibre_app',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "client_id" },
        ]
      },
    ]
  });
};
