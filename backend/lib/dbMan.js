const events = require("events");
const { Sequelize } = require("sequelize");

class DbMan extends events {
  constructor() {
    super();
    this.databaseConnected = false;
    this.dbConnectionError = "";

    const db = new Sequelize(
      "tsdt",
      process.env.DB_USER,
      process.env.DB_PASS,
      {
        host: "localhost",
        dialect: "postgres",
      }
    );

    try {
      sequelize.authenticate();
      this.databaseConnected = true;
      this.dbConnectionError = "";
    } catch (error) {
      this.databaseConnected = false;
      this.dbConnectionError = error;
    }
  }

  getDatabaseStatus() {
    return {
      connection: this.databaseConnected,
      error: this.dbConnectionError,
    };
  }

  //users
  getUsers()
  {
    this.
  }
}

module.exports = DbMan;
