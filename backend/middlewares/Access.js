var jwt = require("jsonwebtoken");
const { DataTypes } = require("sequelize");
const db = require("../configs/db");
const userModel = require("../models/login/users")(db, DataTypes);
const baseControllers = require("./../controllers/BaseController");

const accessCheck = (req, res, next) => {
  if (!req.headers.authorization) {
    baseControllers.login;
  }
  next();
};

module.exports = accessCheck;
