/*数据结构*/
var mongoose = require("mongoose");
/*一个schema代表数据库中的一张表*/

// 用户的表结构
module.export = new mongoose.Schema({
	//用户名
	username:String,
	// 密码
	password:String
})