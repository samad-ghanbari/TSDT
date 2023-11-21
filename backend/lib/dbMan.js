const events = require("events");
const { Sequelize, DataTypes } = require("sequelize");
var initModels = require("./../models/init-models");
var { users } = require("./../models/base/users");

class DbMan extends events {
  constructor() {
    super();
    this.databaseConnected = false;
    this.error = "";
    this.models = [];
    this.connection = new Sequelize(
      "tsdt",
      process.env.DB_USER,
      process.env.DB_PASS,
      {
        host: "localhost",
        dialect: "postgres",
      }
    );

    try {
      this.connection.authenticate();
      this.databaseConnected = true;
      this.error = "";
      //this.models = initModels(this.connection);
    } catch (error) {
      this.databaseConnected = false;
      this.error = error;
      console.log(error);
    }
  }

  getDatabaseStatus() {
    return {
      connection: this.databaseConnected,
      error: this.error,
    };
  }

  //users
  getUsers() {
    var res = [];
    this.connection.sync().then(
      users.findAll()
      .then((result) => {
        res = result;
      })
      .catch((error) => {
        this.error = error;
        res = [];
      });

    return res;
  }
}

module.exports = DbMan;
