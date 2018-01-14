/*用户登录模块*/
var express = require("express");
var router = express.Router();

router.get("/user",function(req,res,next){
	 res.send('user123')
})

 //module.exports = router;

var fn = function (req, res, next) {
    res.send('user789');
  console.log('Request Type:', req.method);
  next();
}


module.exports = fn