const { DataTypes } = require("sequelize");
const db = require("../configs/db");
const personnels = require("../models/base/personnels");
const User = require("../models/login/users")(db, DataTypes);
const Personnel = require("../models/base/personnels")(db, DataTypes);
const UserPolicy = require("../models/login/user_policy")(db, DataTypes);
var Netmask = require("netmask").Netmask;
var jwt = require("jsonwebtoken");
const fs = require("fs");

class BaseController {
	// ************************ Login
	static async loginPage(req, res) {
		return res.json({ url: "login" });
	}

	static async login(req, res) {
		//check not empty natid & pass
		const { natid, password } = req.body;
		if (natid == null || password == null)
			return res.json({
				url: "login",
				error: "No creadential was provided",
			});
		//get personnel
		const personnel = await Personnel.findOne({
			where: { natid: natid },
		});
		if (personnel == null)
			return res.json({ url: "login", error: "user not exists!" });
		// get user
		const user = await User.findOne({
			where: { id: personnel.id, enabled: true },
		});
		if (user == null)
			return res.json({ url: "login", error: "user not exists!" });
		// get user Policy
		const userPolicy = await UserPolicy.findOne({
			where: { id: personnel.id },
		});
		if (userPolicy == null)
			return res.json({
				url: "login",
				error: "user policy not exists!",
			});
		// check ip & net validation
		const ips = userPolicy.ips.ips;
		const nets = userPolicy.ips.nets;
		let requestIP = req.access.requestIP;
		if (requestIP.startsWith("::ffff:"))
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
				return res.json({
					url: "login",
					error: "Network access denied",
				});
		}

		if (!validIp && !validNet) {
			// network permission denied
			return res.json({
				url: "login",
				error: "Network access denied",
			});
		} else {
			//create token
			try {
				//Creating jwt token
				const privateKey = fs.readFileSync(
					"./keys/login-private.pem",
					{
						flag: "r",
						encoding: "utf-8",
					}
				);
				const token = jwt.sign(
					{
						personnel: personnel,
						user: user,
						userPolicy: userPolicy,
					},
					privateKey,
					{ algorithm: "RS256" }
				);

				// update token in db
				user.update({ token: token });

				return res.json({
					success: true,
					url: "/home",
					token: token,
				});
			} catch (err) {
				res.status(500).json({
					success: false,
					error: "cannot generate token",
					err: err,
				});
			}
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
