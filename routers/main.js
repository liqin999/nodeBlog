/*主要应用模块*/
var express = require("express");
var router = express.Router();
router.get("/",function(req,res,next){
	 res.render('main/index.html')
})

 module.exports = router;