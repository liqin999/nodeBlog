/*主要应用模块 默认显示首页，填写表单的时候处理表单的逻辑*/
var express = require("express");
var router = express.Router();

router.get("",function(req,res){
//访问根目录的时候加载相应的页面index.html
 	 res.render('index')
 });

router.get("/process_get",function(req, res){
	// 输出json的格式
	var response = {
		'username':req.query.username,
		'password':req.query.password,
	}
	console.log(response);//可以将数据存储到数据库中，下次寸的登录的时候从数据库查询是否是注册过的用户
	let data={
		code:1,
		mes:'注册成功',
		info:JSON.stringify(response)
	}
    res.send(data);//服务器端显示的数据
})
 module.exports = router;