const usersModel = require("../models/base/users");

class BaseController {
  // ************************ Login
  static async login(req, res) {
    let { connection, DataTypes } = req.database;
    var users = usersModel(connection, DataTypes);
    let allUsers = await users.findAll();

    return res.json({ u: allUsers });
  }

  // ************************
  // ************************
  // ************************
  // ************************
  // ************************
  // ************************
  // ************************
  // ************************
  // ************************
  // ************************
  // ************************
  // ************************
  // ************************
  // ************************
  // ************************
  // ************************
  // ************************
  // ************************
  // ************************
}

module.exports = BaseController;