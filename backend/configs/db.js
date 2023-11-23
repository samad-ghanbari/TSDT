const Sequelize = require("sequelize");
require("dotenv").config();

const url = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:5432/tsdt`;

const db = new Sequelize(url, { logging: false });

try {
  db.authenticate();
  console.log("Database Connected");
} catch (error) {
  console.log("Database Connection Error");
  console.log(error);
}

module.exports = db;
