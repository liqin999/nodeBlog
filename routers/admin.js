/*用户登录模块*/
var express = require("express");
var router = express.Router();
var User = require("../models/User");
var Categery = require("../models/Categery");
// 统一的返回数据
var responseData;
router.use(function(req,res,next){//路由中间件的形式，默认的请求都会走这里
	if(!req.userInfo.isAdmin){
		res.send('对不起，只有管理员才能进入这个页面');
		return;
	}
	responseData={
		code:0,
		message:''
	};
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
	Categery.find().count().then(function(count){

	//计算总页数
    pages = Math.ceil(count/limit);
    //取值不能超过pages
    page = Math.min(page,pages)
    //取值不能小于1
    page = Math.max(page,1)

	var skip = (page -1)*limit;//从第几页开始显示

	Categery.find().limit(limit).skip(skip).then(function(users){
		//针对page做限制
		res.render('admin/categery_index',{
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


//顶部的退出操作 清除当前的cookie
router.get('/user/loginout',function(req,res){
	req.cookies.set('userInfo',null);
	responseData.code = 1;
	responseData.message = '用户已经退出登陆了';
	res.json(responseData);//res.json将数据按照json的形式返回到前端页面
})



//分类列表从数据库读取分类，显示到前台中
router.get('/categery',function(req,res,next){
	var page = req.query.page || 1;//当前页
	var limit = 2;//每页显示多少条
	var pages = 0;//总页数
	Categery.find().count().then(function(count){
	//计算总页数
    pages = Math.ceil(count/limit);
    //取值不能超过pages
    page = Math.min(page,pages)
    //取值不能小于1
    page = Math.max(page,1)

	var skip = (page -1)*limit;//从第几页开始显示

	Categery.find().limit(limit).skip(skip).then(function(categery){
		res.render('admin/categery_index',{
		    userInfo:req.userInfo,
		    categery:categery,
		    count:count,
		    pages:pages,
		    limit:limit,
		    page:page//将当前页传递到前台模板中进行实现分页
	    });
	  })
	})


})


//分类添加页面
router.get('/categery/add',function(req,res,next){
	res.render('admin/categery_add',{
		userInfo:req.userInfo
	});
})

//分类的保存 保存到数据库中
router.post('/categery/add',function(req,res,next){
	let name = req.body.name || '';
	if(name == ""){
		res.render("admin/error",{
			userInfo:req.userInfo,
			message:'分类的名称不能为空！'
		});
		return;
	}

	//查看数据库是否已经存在相同名字的分类名
   Categery.findOne({name:name}).then(function(newname){
   		if(newname){//表示数据库已经存在了
   			res.render("admin/error",{
				userInfo:req.userInfo,
				message:'分类的名已经存在！'
		   });
   		   return Promise.reject();
   		}else{//数据库不存在该字段可以保存
   			return new Categery({name:name}).save();
   		}
   }).then(function(newcategery){
   		 res.render("admin/success",{
				userInfo:req.userInfo,
				message:'分类的保存成功',
				url:'/admin/categery'
		 });
   })
})


//分类的修改
router.get('/categery/edit',function(req,res,next){
	//获取要修改的分类的信息，然后使用表单的形式
	//展示出来
	 var _id = req.query.id || '';
	 //获取要修改的分类的信息
	 Categery.findOne({_id:_id}).then(function(categery){
	 	if(!categery){
	 		 res.render("admin/error",{
	 		 	userInfo:req.userInfo,
				message:'分类信息不存在',
	 		 })
	 		 return;
	 	}else{
	 		res.render("admin/categery_edit",{
				userInfo:req.userInfo,
				categery:categery,
		    });
	 	}
	 })
})

//分类的修改,然后进入保存的页面
router.post('/categery/edit',function(req,res,next){
	let name = req.body.name || '';
	let _id = req.query.id;
	console.log(_id);

	/*Categery.findOne({_id:_id}).*/

	return Categery.findOne({_id:_id}).update({$set:{'name':name}});

	 return;
	  Categery.findOne({_id:_id}).then(function(id){
	  	console.log(id)
	  	 if(id){
	  	  return Categery.findOne({_id:_id}).update({$set:{'name':name}}).save();
	  	 	
	  	 	//db.col.update({'title':'MongoDB 教程'},{$set:{'title':'MongoDB'}})
	  	 	//db.user.update({'name':'jack'},{$set:{'age':20}})
	  	 	return new Categery({name:name}).save();
	  	 }
	  }).then(function(){
	  	 res.render("admin/success",{
				userInfo:req.userInfo,
				message:'分类的保存成功',
				url:'/admin/categery'
		 });
	  })

})





module.exports = router