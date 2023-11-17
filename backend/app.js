var express = require("express");
var path = require("path");
//var cookieParser = require("cookie-parser");
//var logger = require("morgan");
var dotenv = require("dotenv");
var cors = require("cors");

var baseRouter = require("./routes/base");

dotenv.config();
var app = express();

app.use(cors());
//app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", baseRouter);
app.use((req, res, next) => {
  res.json({});
});

module.exports = app;
