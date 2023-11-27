var jwt = require("jsonwebtoken");
const { DataTypes } = require("sequelize");
const db = require("../configs/db");
const userModel = require("../models/login/users")(db, DataTypes);
const baseControllers = require("./../controllers/BaseController");

const accessCheck = (req, res, next) => {
  //no token
  if (!req.headers.authorization) {
    baseControllers.login;
  }
  //invalid token
  const token = req.headers.authorization;
  console.log(token);
  const decodedToken = jwt.verify(token, "samad");
  console.log(decodedToken);
  baseControllers.login;

  next();
};

module.exports = accessCheck;
