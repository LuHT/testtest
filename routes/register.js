var express = require('express');
var router = express.Router();


router.get('/', function(request, response) {
	
  response.render('register',{
  		errors:null,
  		PreviousData : ""
  });
  console.log("this is register page");
});
//Submit Register form
router.post('/',function(request,response){
	//Firebase Database 
	var get = require('../server');
	var db = get.adm.database();
	var ExistingEmail ="";


	console.log(request.body);
	var RegisterD = {
		Email : request.body.Email,
		Password : request.body.Password,
		ConfirmPassword : request.body.ConfirmPassword,
		Phonenumber : request.body.Phonenumber,
		category : request.body.category
	};
	request.check('Email','Invalid email address').isEmail();
	request.check('Password','Must contain more than 6 keys!').isLength({min:6});
	request.check('ConfirmPassword',"These passwords don't match. Try again?").equals(request.body.Password);
	request.check('Phonenumber','Invalid Phone Number').isMobilePhone('ms-MY');
	request.check('category','Invalid Category').equals(request.body.category);
	var t =request.getValidationResult().then(function(errors) {
      if (!errors.isEmpty()) {
         var ALErrors = errors.array().map(function (elem) {
                return elem.msg;
            });
         	console.log(ALErrors);
         	response.status(400).send({Error: ALErrors}); 
      }else {
      	 	 //check Existing Email in Retailers database
        	 var ref = db.ref("Retailers").orderByChild("Email");
        	 ref.equalTo(request.body.Email).once('value',function(snapshot){
        	 	console.log("RetailerCheck " + snapshot.val());
        	 	var RetailersCheck = snapshot.val();
        	 	if(RetailersCheck == null)
        	 	{
        	 		var refA = db.ref("Admin").orderByChild("Email");
        	 		refA.equalTo(request.body.Email).once('value',function(snapshot){
					console.log("AdminCheck " + snapshot.val());
					var AdminCheck = snapshot.val();
        	 			if(AdminCheck == null)
        	 			{
        	 				ExistingEmail ="";
        	 				console.log(request.body.downloadURL);
        	 				console.log(request.body.downloadURL);
        	 				//Store register data 
        	 				var StoreRef = db.ref().child("Admin");
        	 				var Pushkey = StoreRef.push({
    							  "Profile_pic" : request.body.downloadURL,
    							  "Email" : request.body.Email,
    							  "Password" : request.body.Password,
    							  "Phone_number" : request.body.Phonenumber,
                    "Profile_name":request.body.ProfileName,
    							  "Category" : request.body.category
  							});
                var ArrayLocation = request.body.Location.split(",");
                var ArrayLatLng = request.body.LatLng.split(",");
                var ArrayCity = request.body.City.split(",");
                 for(var x = 0 ; x <ArrayLocation.length ; x++)
                 {
                  StoreRef.child("/" + Pushkey.getKey() + "/Locations").push({
                     "Location_Name" : ArrayLocation[x],
                     "LatLng" : ArrayLatLng[x],
                     "City" :ArrayCity[x]
                 });
                 }
  							response.send({redirect: '/'});
        	 			}
        	 			else
        	 			{
        	 				ExistingEmail = "That Email is Register. Try another."
        	 				response.status(400).send({Error: [ExistingEmail], User_Email:request.body.Email}); 
        	 			}
        	 		
        	 		});
        	 	}
        	 	else{
        	 		ExistingEmail = "That Email is Register. Try another."
        	 		response.status(400).send({Error: [ExistingEmail], User_Email:request.body.Email}); 
        	 	}
        	 });
      }
    });
});

module.exports = router;