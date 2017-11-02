var express = require('express');
var router = express.Router();


router.get('/', checkSignIn, function(req, res){
	var get = require('../server');
	var db = get.adm.database();
	var GetRetailerName = db.ref("Retailers");

	console.log("This is retailerPost");
 	var shopCategory = req.session.shop_Category.split(",");
	var ShopLocation = req.session.shopLocation = ShopLocation;
	var dataPromise = new Promise(function(resolve,reject){
		GetRetailerName.on('value',function(snapshot){
			var RetailerData = snapshot.val();
			resolve(RetailerData)
		});

 	});

 	dataPromise.then(function(RetailerData){
 		var Retailername = [];
 		for(var key in RetailerData)
 		{
 			if(RetailerData[key].Shop_Name != req.session.retailer_shop )
 			{
 				Retailername.push(RetailerData[key].Shop_Name);
 			}
 			
 		}
 		console.log(Retailername);
 		res.render('retailerPost',{shopName :  req.session.retailer_shop, shopCategory : shopCategory, Retailername : Retailername});
  		res.end();

	});
   
});

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

router.post("/",function(request, response){
	console.log("sign");
	console.log('body: ' + request.body.Signout);
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

router.post("/CheckPostInfo", function(request,response){
	var get = require('../server');
	var db = get.adm.database();
	var data = request.body;
	var city =  request.body.city;
	var retailer_name_arr = [];
	var retailer_pic_arr = [];
	var timestamp = (new Date).getTime();
	console.log("CheckPostInfo");
	console.log(request.body.Participation);

	var collaborate = data.collaboration["invited_retailer"];
	
	var StoreRef = db.ref().child("Events/" + city);
	
	var Pushkey;
	//push event data 
 	data["timestamp"] = timestamp;
 	data["organizer_pic"] = request.session.organizer_pic;
 	data["qr_check"] = "0";
 	data["interest"] = "0";
 	data["going"] = "0";
 	//post event datta
	 Pushkey= StoreRef.push(
		data
  	);
	 //push notification invited organizer & application
 if(collaborate)
   {
	    var collaborater= collaborate.split(",");

	   	 var Rkey = Pushkey.getKey();
	    //push invitation retailer notification 
	      var ref = db.ref("Retailers").orderByChild("Email");
	      console.log(collaborater.length);
	    var dataPromise = new Promise(function(resolve,reject){
	    for(var  x = 0 ; x < collaborater.length ; x++)
	    {
	      var invited_retailerRef = db.ref().child("Retailers").orderByChild("Shop_Name");
	      invited_retailerRef.equalTo(collaborater[x]).once('value',function(snapshot){
	      var keys = Object.keys(snapshot.val());
	      	var pic = snapshot.val();
        	retailer_name_arr.push(keys[0]);
        	retailer_pic_arr.push(pic[keys].Profile_pic);

	      if(retailer_name_arr.length == collaborater.length)
	      {
	        console.log("here2");
	        resolve({retailer_name_arrs :retailer_name_arr, retailer_pic_arrs : retailer_pic_arr });
	      }     
	    });
	    }

	  });
	    dataPromise.then(function({retailer_name_arrs,retailer_pic_arrs}){
	    console.log("dlsd : " + retailer_name_arrs);
		console.log("ssxcxcvxcv : " + request.session.retailer_key);
		

		var collaborator = db.ref().child("Events/" + city +"/" + Rkey +"/collaboration/collaborator");
		for(var x = 0 ; x <  retailer_name_arrs.length  ; x++)
		{
			collaborator.push({
				organizer_id : retailer_name_arrs[x],
				organizer_name : collaborater[x],
				organizer_pic : retailer_pic_arrs[x],
				status : "pending"
			});
			var writedata = db.ref().child("Retailers/" + retailer_name_arrs[x] + "/notification");
				writedata.push({
				receiver_id : retailer_name_arrs[x],
				receiver_name : collaborater[x],
				sender_id : request.session.retailer_key,
				sender_name : request.session.retailer_shop,
				event_id : Rkey,
				expiry_date : data.end_date,
				timestamp : timestamp,
				classification : "invitation",
				read : "false",
				handles : "pending"
			});

		}
 	});
	}
	else
	{

	}	
/*	console.log("This is CheckPostInfo");
	//console.log('body: ' + request.body.date);
	console.log(request.body);
	//console.log(request.body.image);
	request.session.PostInfo = request.body;
	console.log("session");
	console.log(request.session.PostInfo);*/
	response.send({proceed: "/retailer"});
	//response.send({redirect: '/'});
 	
});
module.exports = router;

