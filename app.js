
var express = require("express");

//swig是模板引擎，用于加载外部的模板文件
var swig = require("swig");
var app = express();

/*加载数据库模块*/
var mongoose = require('mongoose');

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
*根据不同的功能划分模块
*/
/*
app.get('/',function(req,res){
	res.render('index')
})*/


app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));


app.use('/users', function (req, res, next) {
 res.send('USER');
  next();
});

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

