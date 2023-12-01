const { DataTypes } = require("sequelize");
const db = require("../configs/db");
const userModel = require("../models/login/users")(db, DataTypes);
const userPolicyModel = require("../models/login/user_policy")(db, DataTypes);
var jwt = require("jsonwebtoken");
const requestIP = require("request-ip");
const fs = require("fs");
var Netmask = require("netmask").Netmask;

const accessCheck = async (req, res, next) => {
	let token = null;
	let access = {};
	let ips = {};
	let url = req.url;
	let reqIp = requestIP.getClientIp(req);
	if (reqIp.startsWith("::ffff:")) reqIp = reqIp.replace("::ffff:", "");
	access.requestIP = reqIp;

	if (req.headers.authorization) {
		access.token = req.headers.authorization.split(" ")[1];
		const publickey = fs.readFileSync("./keys/login-public.pem");
		try {
			access.decodedToken = jwt.verify(access.token, publickey, {
				algorithm: "RS256",
			});
		} catch (error) {
			return res.json({
				url: "login",
				error: "invalid token provided",
			});
		}

		// verify token
		const userId = access.decodedToken.user.id;
		const user = await userModel.findOne({ where: { id: userId } });
		if (user == null) {
			return res.json({
				url: "login",
				error: "invalid user",
			});
		} else {
			if (access.token == user.token) {
				if (url == "/" || url == "/login") req.url = "/home";
			} else {
				return res.json({
					url: "login",
					error: "invalid token provided",
				});
			}
		}
	} else {
		if (url == "/") {
			//check ip permission
			let allow = false;
			let allIpArray = [];
			let allNetArray = [];
			const allIps = await userPolicyModel.findAll({
				attributes: ["ips"],
			});
			allIps.forEach((row) => {
				allIpArray = [...allIpArray, ...row.ips.ips];
				allNetArray = [...allNetArray, ...row.ips.nets];
			});
			allIpArray = removeDuplicates(allIpArray);
			allNetArray = removeDuplicates(allNetArray);

			allow = ipAccessPermission(access.requestIP, allIpArray);
			console.log(access.requestIP, allNetArray);
			if (allow == false)
				allow = netAccessPermission(
					access.requestIP,
					allNetArray
				);

			if (allow) return res.json({ url: "login", error: "" });
			else
				return res.json({
					url: "accessDenied",
					error: "Network Permission Denied",
				});
		} else if (url != "/login") {
			return res.json({ url: "login", error: "no token provided" });
		}
	}

	req.access = access;
	next();
};

const removeDuplicates = (array) => {
	return array.filter((item, index) => array.indexOf(item) === index);
};
const ipAccessPermission = (ip, allIpArray) => {
	if (allIpArray.includes(ip)) return true;
	else return false;
};
const netAccessPermission = (ip, allNetArray) => {
	var block;
	let validNet = false;
	for (let i = 0; i < allNetArray.length; i++) {
		block = new Netmask(allNetArray[i]);
		validNet = block.contains(ip);
		if (validNet) break;
	}

	return validNet;
};

module.exports = accessCheck;
