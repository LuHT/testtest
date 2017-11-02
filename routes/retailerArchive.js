var express = require('express');
var router = express.Router();


function checkSign(req,res,next){
	if(req.session.user)
	{
		console.log("User: " + req.session.user );
		
		console.log("here");
		next();
	}else{
		console.log("ssss");
		var err = new Error("Not Logged in");
		console.log("fff" + req.session.user);
	
		res.redirect('/');
		return next(err);
	}
}


router.get('/', checkSign, function(req, res){
  console.log("retailerArchive page loaded");
   res.render('retailerArchive');
   res.end();
});

module.exports = router;