/*用户登录模块*/
var express = require("express");
var router = express.Router();
var User = require("../models/User");

router.use(function(req,res,next){//路由中间件的形式，默认的请求都会走这里
	if(!req.userInfo.isAdmin){
		res.send('对不起，只有管理员才能进入这个页面');
		return;
	}
	next();
});

//首页
router.get('/',function(req,res,next){
	res.render('admin/index',{
		userInfo:req.userInfo
	});
})

//用户管理
router.get('/user',function(req,res,next){
	/*
	*从数据库读取所有的数据
	*数据的分页  借助于 limit(nunber) 限制数据库参数的条数 
	*Skip(nunber)跳过指定数量的数据
	*每页显示两条
	* 1： 1-2 skip 0 -> （当前页-1）* 每页显示的条数
	* 2： 3-4 skip 2
	* 3： 4-5 skip 4
	*/

	var page = req.query.page || 1;//当前页
	var limit = 2;//每页显示多少条
	var pages = 0;
	User.find().count().then(function(count){

	//计算总页数
    pages = Math.ceil(count/limit);
    //取值不能超过pages
    page = Math.min(page,pages)
    //取值不能小于1
    page = Math.max(page,1)

	var skip = (page -1)*limit;//从第几页开始显示

	User.find().limit(limit).skip(skip).then(function(users){
		//针对page做限制
		res.render('admin/user_index',{
		    userInfo:req.userInfo,
		    users:users,
		    count:count,
		    pages:pages,
		    limit:limit,
		    page:page//将当前页传递到前台模板中进行实现分页
	    });
	})

	})
	
	
})

module.exports = router