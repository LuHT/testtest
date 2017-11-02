var express = require('express');
var router = express.Router();


function checkSignIn(req,res,next){
	if(req.session.user)
	{
		//res.render('retailer');
		console.log("here");
		next();
	}else{
		var err = new Error("Not Logged in");
		console.log("fff" + req.session.user);
		
		res.redirect('/');
		return next(err);
	}
}

router.get('/', checkSignIn, function(req, res){
  console.log("This is admin");
   res.render('admin');
   res.end();
});


router.post("/",function(request, response){
	console.log('user_Logout: ' + request.body.Signout);
	var Signout = request.body.Signout;
	if(Signout == "yes")
	{
	 	request.session.destroy(function(){
      	console.log("user logged out.");
      	response.send({redirect: '/'});
   });
}
 	//response.end();
});
module.exports = router;