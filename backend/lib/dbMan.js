const events = require("events");
const { Sequelize, DataTypes } = require("sequelize");
var initModels = require("./../models/init-models");

class DbMan extends events {
  constructor() {
    super();
    this.databaseConnected = false;
    this.dbConnectionError = "";

    this.db = new Sequelize("tsdt", process.env.DB_USER, process.env.DB_PASS, {
      host: "localhost",
      dialect: "postgres",
    });

    try {
      this.db.authenticate();
      this.databaseConnected = true;
      this.dbConnectionError = "";
      this.models = initModels(this.db);
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
  getUsers() {
    var users = this.models.baseUsers.findByPk(1);
    return users;
  }
}

module.exports = DbMan;
