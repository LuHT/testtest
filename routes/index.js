var get = require('../server');
var express = require('express');
var router = express.Router();
function init()
{
	var get = require('../server');
	var db = get.adm.database();
	var ref = db.ref("Adv").orderByKey();
	var c = new Date().getTime();
	var days = 30 * 60 * 60 * 1000 * 24;
	var expiredDate = c - days;

	console.log("Today date: " + c);
	console.log("Days: " + days);
	ref.once('value',function(snapshot){

		snapshot.forEach(function(childSnapshot){
			var key = childSnapshot.key;
	
		db.ref("Adv/"+ key).once('value',function(snapshot){
			snapshot.forEach(function(childsSnapshot){
			var keys = childsSnapshot.key;
			var db_path = db.ref("Adv/"+ key +"/"+ keys);
				db_path.once('value',function(snapshot){
				var info  = snapshot.val();
				console.log(info.Expiry_Date);
				var myDate= info.Expiry_Date.split("-");
				var newDate=myDate[1]+","+myDate[2]+","+myDate[0];
				var ConvertDate= new Date(newDate).getTime();
			if(ConvertDate <= expiredDate)
			{
				//copy
				var new_path = db.ref("Outdated/" + keys);
  				new_path.set( info, function(error) {
					console.log(db_path.toString());
					//remove
					//db_path.remove();
				 });
			}
		
			});
		});
	});
});
	},function(errorObject)
	{
		console.log("Error!");
	});

}


//get Index page
router.get('/', function(request, response) {
	var get = require('../server');
	var FAuth = get.FireAuth;
  console.log("This is index " + request.session.user);
 //Get_Data();
	FAuth.auth().onAuthStateChanged(function(user) {
			if(user)
			{
				console.log(user.email);
			}

		});
  if(request.session.user)
  {
	    response.render('index',{ 
  		Layout_type:"Retailer_Layout",
  		Retailer_Shop: request.session.retailer_shop
  });
  }
  else{
  	console.log("dddd");
  		response.render('index',{
  		Layout_type:"Layout"
  });


  }
});
//Redirect retailer or Admin page
router.post("/",function(request, response){
	var get = require('../server');
	var FAuth = get.FireAuth;
	var db = get.adm.database();
	var redirect;
	console.log(request.body.Email);
	console.log(request.body.Password);
	
	//User Login
	FAuth.auth().signInWithEmailAndPassword(request.body.Email, request.body.Password).then(function(user){
 		//Login success
 		request.session.user = request.body.Email;
 		var refA = db.ref("Admin/Profile").orderByChild("Email");
        	refA.once('value',function(snapshot){

        	 	var checkAdmin = snapshot.val();
        	 	console.log(checkAdmin.Email);
        	 	if(checkAdmin.Email != request.session.user)
        	 	{
        	 		console.log("REtailet");
        	 		response.send({redirect: "/retailer"});
        	 	}
        	 	else
        	 	{
        	 		redirect = "/admin";
        	 		response.send({redirect: "/admin"});
        	 	}

        	 	});
	}).catch(function(error){
		//Login fail
		var errorCode = error.code;
 		var errorMessage = error.message;
 	 	console.log("err");
		response.status(400).send({Error: errorMessage}); 
		response.end();
	});
});
//index Signout
router.post("/R_ASig",function(request, response){
	console.log("Gete");	
	var get = require('../server');
	var FAuth = get.FireAuth;
	if(request.body.Signout == "yes")
	{
		request.session.destroy(function(){
      	console.log("user logged out.");
      	FAuth.auth().signOut().then(function() {
      		response.send({redirect: '/'});
		}).catch(function(error) {
		// An error happened.
		console.log(error);
	});
      
      });
	}

});
function Get_Data()
{
	var get = require('../server');
	var db = get.adm.auth();
	db .getUserByEmail("luluz9971@gmail.com")
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully fetched user data:", userRecord.toJSON());
  })
  .catch(function(error) {
    console.log("Error fetching user data:", error);
  });

}
/*router.post('/', function(request, response) {
var obj = {};
	console.log('body: ' + request.body.name);
 	response.end("yes");
});*/

  /*db .getUser("1GIdDirUotOXJhPTiqn3bDsijQp1")
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully fetched user data:", userRecord.toJSON());
  })
  .catch(function(error) {
    console.log("Error fetching user data:", error);
  });*/
	
  		/*var get = require('../server');
	var db = get.adm.database();
	var ref = db.ref("Retailers").orderByChild("Email").equalTo("luluz9971@gmail.com");
	var promise = new Promise(function(resolve, reject) {
		ref.once('value',function(snapshot){
			var data = snapshot.val();
				resolve(data);	
		},function(errorObject)
		{
			console.log("Error!");
		});
	});
	  promise.then(function(data){
	  	console.log(data[Object.keys(data)]);

	});*/
function init2()
{
	var get = require('../server');
	var db = get.adm.database();
	var ref = db.ref("Adv").orderByKey();
	var c = new Date().getTime();
	//var days = 30 * 60 * 60 * 1000 * 24;
	var days = 1 * 60 * 60 * 1000 * 24;
	var expiredDate = c - days;

	console.log("Today date: " + c);
	console.log("Days: " + days);
	ref.once('value',function(snapshot){

		snapshot.forEach(function(childSnapshot){
			var key = childSnapshot.key;
	
		db.ref("Adv/"+ key).once('value',function(snapshot){
			snapshot.forEach(function(childsSnapshot){
			var keys = childsSnapshot.key;
			var db_path = db.ref("Adv/"+ key +"/"+ keys);
				db_path.once('value',function(snapshot){
				var info  = snapshot.val();
				console.log(info.end_date);
				var myDate= info.end_date.split("-");
				var newDate=myDate[1]+","+myDate[2]+","+myDate[0];
				var ConvertDate= new Date(newDate).getTime();
			if(ConvertDate <= expiredDate)
			{
				//copy
				var new_path = db.ref("Outdated/" + keys);
  				new_path.set( info, function(error) {
					console.log(db_path.toString());
					//remove
					//db_path.remove();
				 });
			}
		
			});
		});
	});
});
	},function(errorObject)
	{
		console.log("Error!");
	});

}

module.exports = router;



		