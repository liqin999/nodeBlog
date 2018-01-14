//定义一个模型类 用于对用户的表进行操作
var mongoose = require("mongoose");
var usersSchema = require('../schemas/user');
module.exports = mongoose.model('User',usersSchema)