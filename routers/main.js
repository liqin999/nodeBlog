/*主要应用模块*/
var express = require("express");
var router = express.Router();
router.get("/",function(req,res,next){//将用户信息分配模板
	
	 res.render('main/index.html',{//第二个参数传递的对象就是分配给模板用的数据
	 	userInfo:req.userInfo
	 })
})

 module.exports = router;

// 分屏工作  快速的开发的效率的同时  提高自己单位时间的产出量
