var DataTypes = require("sequelize").DataTypes;
var _design = require("./design");
var _item = require("./item");
var _mercadolibre_app = require("./mercadolibre_app");
var _mercadolibre_auth = require("./mercadolibre_auth");
var _message = require("./message");
var _message_type = require("./message_type");
var _sequelizemeta = require("./sequelizemeta");
var _sessions = require("./sessions");
var _user = require("./user");
var _user_type = require("./user_type");

function initModels(sequelize) {
  var design = _design(sequelize, DataTypes);
  var item = _item(sequelize, DataTypes);
  var mercadolibre_app = _mercadolibre_app(sequelize, DataTypes);
  var mercadolibre_auth = _mercadolibre_auth(sequelize, DataTypes);
  var message = _message(sequelize, DataTypes);
  var message_type = _message_type(sequelize, DataTypes);
  var sequelizemeta = _sequelizemeta(sequelize, DataTypes);
  var sessions = _sessions(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var user_type = _user_type(sequelize, DataTypes);

  item.belongsTo(design, { as: "fk_design_design", foreignKey: "fk_design"});
  design.hasMany(item, { as: "items", foreignKey: "fk_design"});
  message.belongsTo(message_type, { as: "type_message_type", foreignKey: "type"});
  message_type.hasMany(message, { as: "messages", foreignKey: "type"});
  mercadolibre_auth.belongsTo(user, { as: "id_user", foreignKey: "id"});
  user.hasOne(mercadolibre_auth, { as: "mercadolibre_auth", foreignKey: "id"});
  user.belongsTo(user_type, { as: "user_type", foreignKey: "user_type_id"});
  user_type.hasMany(user, { as: "users", foreignKey: "user_type_id"});

  return {
    design,
    item,
    mercadolibre_app,
    mercadolibre_auth,
    message,
    message_type,
    sequelizemeta,
    sessions,
    user,
    user_type,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
