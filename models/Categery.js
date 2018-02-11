//定义一个模型类 用于对用户的表进行操作
var mongoose = require("mongoose");
var categerySchema = require('../schemas/categery');
module.exports = mongoose.model('Categery',categerySchema)