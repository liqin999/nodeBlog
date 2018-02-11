/*数据结构*/
var mongoose = require("mongoose");
/*一个schema代表数据库中的一张表*/

// 分类的表结构
module.exports = new mongoose.Schema({
	//分类名
	name:String	
})