const { Sequelize } = require("sequelize");

class baseController {
  constructor() {}

  // ************************ Login
  static async login(req, res) {
    var db_status = "";

    const sequelize = new Sequelize(
      "tsdt",
      process.env.DB_USER,
      process.env.DB_PASS,
      {
        host: "localhost",
        dialect: "postgres",
      }
    );
    try {
      await sequelize.authenticate();
      db_status = "Connection has been established successfully.";
    } catch (error) {
      db_status = "Unable to connect to the database: " + error;
    }

    return res.json({ db: db_status });
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

module.exports = baseController;
