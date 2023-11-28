const { DataTypes } = require("sequelize");
const db = require("../configs/db");
const userModel = require("../models/login/users")(db, DataTypes);
var jwt = require("jsonwebtoken");
const requestIP = require("request-ip");

const accessCheck = (req, res, next) => {
  let token = null;
  let access = {};
  let ips = {};
  if (req.headers.authorization) {
    access.token = req.headers.authorization.split(" ")[1];
    //access.decodedToken = jwt.verify(token, "samad");
  }
  access.requestIP = requestIP.getClientIp(req);
  req.access = access;
  next();
};

module.exports = accessCheck;
