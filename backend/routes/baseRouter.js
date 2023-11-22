var express = require("express");
var router = express.Router();
var BaseController = require("../controllers/BaseController");

router.get("/", BaseController.login);

module.exports = router;
