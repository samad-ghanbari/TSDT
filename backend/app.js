var express = require("express");
var path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
var dotenv = require("dotenv");
var cors = require("cors");
//var cookieParser = require("cookie-parser");
//var logger = require("morgan");

var baseRouter = require("./routes/baseRouter");

dotenv.config();
var app = express();

app.use(cors());
//app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, "public")));

const url = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:5432/tsdt`;
const connection = new Sequelize(url, { logging: false });
let dbConnection = false;
let error = "";
try {
  connection.authenticate();
  dbConnection = true;
} catch (err) {
  console.log(err);
  error = err;
}

if (dbConnection) {
  let database = { connection, DataTypes };
  app.use(function (req, res, next) {
    req.database = database;
    next();
  });
  // routers
  app.use("/", baseRouter);

  app.use((req, res, next) => {
    res.json({});
  });
} else {
  app.use((req, res, next) => {
    res.json({ connectionError: error });
  });
}

module.exports = app;
