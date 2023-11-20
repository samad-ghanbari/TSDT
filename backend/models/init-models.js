var DataTypes = require("sequelize").DataTypes;
var _users = require("./base/users");

function initModels(sequelize) {
  var baseUsers = _users(sequelize, DataTypes);

  return {
    baseUsers,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
