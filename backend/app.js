var express = require("express");
var path = require("path");
var cors = require("cors");
var baseRouter = require("./routes/baseRouter");
var accessCheck = require("./middlewares/Access");
var BaseController = require("./controllers/BaseController");

var db = require("./configs/db");

var app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Access check
app.use((req, res, next) => accessCheck(req, res, next));

// Routers
app.use("/", baseRouter);

//undefined routes
app.use((req, res) => {
  res.json({});
});

module.exports = app;
