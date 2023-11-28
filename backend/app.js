var express = require("express");
var path = require("path");
var cors = require("cors");
var baseRouter = require("./routes/baseRouter");
var accessCheck = require("./middlewares/Access");
var BaseController = require("./controllers/BaseController");
var db = require("./configs/db");
var bodyParser = require("body-parser");

var app = express();

app.use(cors());
app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
//Access middleware
app.use((req, res, next) => accessCheck(req, res, next));
// Routers
app.use("/", baseRouter);
app.use("/login", baseRouter);
app.use("/logout", baseRouter);

//undefined routes
app.use(baseRouter);

module.exports = app;
