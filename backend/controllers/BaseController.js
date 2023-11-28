const { DataTypes } = require("sequelize");
const db = require("../configs/db");
const User = require("../models/login/users")(db, DataTypes);
const Personnel = require("../models/base/personnels")(db, DataTypes);
const UserPolicy = require("../models/login/user_policy")(db, DataTypes);
var Netmask = require("netmask").Netmask;

class BaseController {
  // ************************ Login
  static async loginPage(req, res) {
    return res.json({ url: "login" });
  }

  static async login(req, res) {
    const { natid, password } = req.body;
    const personnel = await Personnel.findOne({ where: { natid: natid } });
    if (personnel == null)
      return res.json({ url: "login", error: "user not exists!" });

    const user = await User.findOne({ where: { id: personnel.id } });
    if (user == null)
      return res.json({ url: "login", error: "user not exists!" });

    const userPolicy = await UserPolicy.findOne({
      where: { id: personnel.id },
    });
    if (userPolicy == null)
      return res.json({ url: "login", error: "user policy not exists!" });

    // check ip & net validation
    const ips = userPolicy.ips.ips;
    const nets = userPolicy.ips.nets;
    let requestIP = req.access.requestIP;
    requestIP = requestIP.replace("::ffff:", "");

    let validIp = false;
    let validNet = false;

    let validReqIp = ips.includes(requestIP);
    if (validReqIp) {
      validIp = true;
    } else {
      //check net
      var block;
      for (let i = 0; i < nets.length; i++) {
        block = new Netmask(nets[i]);
        validNet = block.contains(requestIP);
        if (validNet) break;
      }

      if (!validNet)
        return res.json({ url: "login", error: "Host-Network access denied" });
    }

    if (!validIp && !validNet) {
      // network permission denied
      return res.json({ url: "login", error: "Network access denied" });
    } else {
      //create token
    }
  }

  static logout(req, res) {
    console.log("logout");
    return res.json({ url: "logout" });
  }

  static home(req, res) {
    return res.json({ url: "home" });
  }

  // ************************
  // ************************
  // ************************
  // ************************
  // ************************
  // ************************
  // ************************
  // ************************
  // ************************
  // ************************
  // ************************
  // ************************
  // ************************
  // ************************
  // ************************
  // ************************
  // ************************
  // ************************
  // ************************
}

module.exports = BaseController;
