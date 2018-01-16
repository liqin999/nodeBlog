
var express = require("express");

//swig是模板引擎，用于加载外部的模板文件
var swig = require("swig");
var app = express();

var Cookie = require('cookies');

/*加载数据库模块*/
var mongoose = require('mongoose');

//加载bodyParser 用来处理post提交的数据	
var bodyParser = require('body-parser');

// 创建 application/x-www-form-urlencoded 编码解析usersSchema
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//bodyParser设置
app.use(urlencodedParser)

//设置cookie  当任何页面进入都会走这个中间件
app.use(function(req,res,next){
	req.cookies = new Cookie(req,res,next);
	//解析用户的cookie信息 然后使用模板解析让用户刷新的时候显示登陆的状态
	req.userInfo = {};// 将得到的cookie信息，绑定到请求的对象上
	if(req.cookies.get('userInfo')){
		try{
			req.userInfo = JSON.parse(req.cookies.get('userInfo'))
		}catch(e){}
	}
	next();
})



//设置静态文件托管
//当用户访问的url以/public开始，那么直接返回对应__dirname + '/public'下的文件
app.use( '/public', express.static( __dirname + '/public') );

//第一个参数：模板引擎的名称，同时也是模板文件的后缀，第二个参数表示用于解析处理模板内容的方法
app.engine('html',swig.renderFile)
//设置模板文件存放的目录，第一个参数必须是views，第二个参数是目录
app.set('views', './views');
//注册所使用的模板引擎，第一个参数必须是 view engine，第二个参数和app.engine这个方法中定义的模板引擎的名称（第一个参数）是一致的
app.set('view engine', 'html');
//在开发过程中，需要取消模板缓存
swig.setDefaults({cache: false});

/*
app.get('/',function(req,res){
	res.render('index')
})*/


app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));


//使用mongoose 链接数据库  blog是数据库的名字
mongoose.connect('mongodb://localhost:27018/blog',function(err){
	if(err){
		console.log('数据库连接失败')
	}else{
		console.log('数据库连接成功');
		//监听http请求 数据库连接成功的时候启动应用
		app.listen(8089);

	}
});

