/*ajax请求数据模块*/
var express = require("express");
var router = express.Router();

router.get("/user",function(req,res,next){
	 res.send('user-api')
})

 module.exports = router;