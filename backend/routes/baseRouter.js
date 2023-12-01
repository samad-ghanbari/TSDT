var express = require("express");
var router = express.Router();
var BaseController = require("../controllers/BaseController");

router.get("/logout", BaseController.logout);

router.post("/login", BaseController.login);

router.post("/home", BaseController.home);

router.all("*", BaseController.home);

module.exports = router;
