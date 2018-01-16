/*ajax请求数据模块*/
var express = require("express");
var router = express.Router();
var User = require('../models/User');

/*
*用户注册 基本的验证
* 1. 用户名不能为空
* 2.密码不能为空
* 3.两次密码是否一致
*
* 1.数据库查询 用户名是否存在
*/ 

// 统一的返回数据
var responseData;
router.use(function(req,res,next){// 不管是按照什么样的形式进来的都处理
	responseData={
		code:0,
		message:''
	};
	next();//程序执行下一步
})

//处理用户的注册 
router.post('/user/register', function (req, res,next) {
   // 输出 JSON 格式
   var username = req.body.username,
       password = req.body.password,
       repassword = req.body.repassword;
   
   //用户名是否为空
   if(username == ''){
		responseData.code = 1;
		responseData.message='用户名不能为空';
		res.json(responseData);//将数据返回给前端
		return;
   }

   //密码是否为空
   if(password == ''){
		responseData.code = 2;
		responseData.message='密码不能为空';
		res.json(responseData);//将数据返回给前端
		return;
   }

   //两次密码是否一致

   if(password != repassword){
		responseData.code = 3;
		responseData.message='两次密码不一致';
		res.json(responseData);//将数据返回给前端
		return;
   }

   //用户名是否被注册过了，如果数据库中已经存在和要注册的同名的字段，表明是重复了
   User.findOne({//操作数据库
   		username:username
   }).then(function(userInfo){
   	    console.log(userInfo);
   		if( userInfo ){
   			//表示数据库存在
   			responseData.code = 4;
   			responseData.message='用户名已经被注册';
   			res.json(responseData);
   			return;
   		}

   		//保存用户信息到数据库中 创建对象代表要操作的数据库，每一个对象代表一条记录
   		var user  = new User({
   			username:username,
   			password:password
   		});
   		return user.save();//保存到数据库，成功会走下句then方法
   }).then(function (newUserInfo) {//将插入的新的记录传递到 newUserInfo
   	    // console.log(newUserInfo)\
		responseData.message='注册成功';
	    res.json(responseData);
   });
});


  //处理用户的登录信息  http://localhost:8089/api/user/login
router.post('/user/login', function (req, res) {
       var username = req.body.username;
       var password = req.body.password;
       if(username == "" || password ==""){
            responseData.code = 1;
            responseData.message='用户名或者密码不能为空';
            res.json(responseData);
            return;
       }

      //从数据库查找是否是已经注册过了
        User.findOne({//操作数据库
         username:username,
         password:password
         }).then(function(userInfo){
            if(userInfo){//说明已经匹配数据库中的用户名
               console.log(userInfo)
               responseData.code = 2;
               responseData.message='登录成功';
               responseData.userInfo={
                  _id:userInfo._id,
                  username:userInfo.username
               };

               //将cookie发送到浏览器，浏览器会把cookie信息保存起来，
               //每次访问站点的时候，浏览器将保存好的cookie信息，通过头信息
               //发送到服务端。服务端得到cookie信息，来验证是否是登录状态
               req.cookies.set('userInfo',JSON.stringify({
                  _id:userInfo._id,
                  username:userInfo.username
               }));

               res.json(responseData);//将数据返回到前端
               return;
             }else{
                  responseData.code = 3;
                  responseData.message='登录失败，请核对后用户名和密码后重新登录';
                  res.json(responseData);
                  return;
             }
         })
 })


//处理用户的退出清除 cookie的信息  
router.get('/user/loginout', function (req, res) {
     req.cookies.set('userInfo',null);
     responseData.code=1;
     responseData.message = '用户已经退出登录';
     res.json(responseData);
      return;
});


 module.exports = router;