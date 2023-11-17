var express = require("express");
var router = express.Router();
var baseController = require("../controllers/baseController");

router.post("/", baseController.login);

module.exports = router;
