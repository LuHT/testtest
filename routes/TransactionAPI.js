var express = require('express');
var router = express.Router();

router.get('/:param1', function(request, response) {
	console.log(request.query);
	var qr_check = (request.query.data).split(",")[1];
	var event_id = (request.query.data).split(",")[0];
	var organizer_id = (request.query.data).split(",")[2];
	var user_email = request.query.user_email;
	var get = require('../server');
	var db = get.adm.database();
	var datapromise = new Promise(function(resolve,reject){
		db.ref("Events").once('value',function(snapshot){
		snapshot.forEach(function(childSnapshot){
		var key = childSnapshot.key;
		var location_key = childSnapshot.key;
			db.ref("Events/" + key).once('value',function(snapshot){
				snapshot.forEach(function(childSnapshot){
					if(childSnapshot.key == event_id)
					{
						resolve({location_key : key, event_id : childSnapshot.key, qrcheck : childSnapshot.val().qr_check ,reward_Point : childSnapshot.val().reward.reward_point});
					}
				});
			});
		});
	});
	});
	datapromise.then(function({location_key,event_id,qrcheck,reward_Point}){
		console.log(location_key);
		console.log(event_id);
		console.log(qrcheck);
		var d = [];
		//check qr_check
		if(qr_check == qrcheck)
		{
			var datapromise2 = new Promise(function(resolve,reject){
							//update user Loyalty_Points 
				db.ref("User/" + user_email).once('value',function(snapshot){
				var loyalty_Points =  parseInt(snapshot.val().Loyalty_Points) +1;
				var update_user = db.ref("User/" + user_email);
					update_user.update({ Loyalty_Points : loyalty_Points.toString() }).then(function(){
	  				//alert("Data saved successfully.");
	  					resolve(loyalty_Points);
					}).catch(function(error) {
	  					//alert("Data could not be saved." + error);
					});
				});
			});
			datapromise2.then(function(loyalty_Points){
				console.log("sss:" +  loyalty_Points);
				var datapromise3 = new Promise(function(resolve,reject){
					//update user event Reward
					db.ref("User/" + user_email + "/events").once('value',function(snapshot){
						snapshot.forEach(function(childSnapshot){
							var R_event_id = childSnapshot.val().event_id;
							if(R_event_id == event_id)
							{
								db.ref("User/" + user_email + "/events/" + childSnapshot.key +"/reward_system").once('value',function(snapshot){
									var reward_Points =  parseInt(snapshot.val().own_point) +parseInt(reward_Point);
									var update_user_R_P = db.ref("User/" + user_email + "/events/" + childSnapshot.key +"/reward_system");
									update_user_R_P.update({ own_point : reward_Points.toString() }).then(function(){
		  							//alert("Data saved successfully.");
		  							resolve({loyalty_Points : loyalty_Points , reward_Points : reward_Points});
									}).catch(function(error) {
		  							//alert("Data could not be saved." + error);
									});
								});		
							}
						});
					});
				});
				datapromise3.then(function({loyalty_Points,reward_Points}){
			//console.log("sss:" +  loyalty_Points);
			//console.log("sss:" +  reward_Points);
			//update qr_check
			var update_qrcheck = db.ref("Events/" + location_key + "/" + event_id);
			var update_qr = parseInt(qrcheck) +1;
			update_qrcheck.update({
				qr_check : update_qr.toString()
			});
			//push event transaction
			var push_event_T = db.ref("Events/" + location_key + "/" + event_id + "/transaction");
			var current_date = new Date();
			console.log(current_date);
			push_event_T.push().set({
				event_id : event_id,
				organizer_id : organizer_id,
				timestamp : current_date.toString(),
				user_email : user_email
			});

			var resultObject = {Loyalty_Points : loyalty_Points, own_point : reward_Points};
  			var resultJson = {result : resultObject};
  			var resultArr = []
 			resultArr.push(resultJson);
  			response.json(resultArr);
		});
			});
		
		}
		else
		{
			console.log("fail");
			var JsonO = {Loyalty_Points : "fail", own_point :"fail"};
 			var resultJson = {result :JsonO};
 			var resultArr = []
 			resultArr.push(resultJson);
 			response.json(resultArr);
		}
	});
			


});
module.exports = router;
