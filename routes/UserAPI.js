var express = require('express');
var router = express.Router();
/*router.get('/', function(request, response) {
 response.send('Hello World!')
  console.log("this is API page");
});*/
//favourite
router.get("/favourite/:param1",function(request,response){
	console.log("this is UserAPI  favourite page");
	var get = require('../server');
	var db = get.adm.database();
	var user_email =  request.query.user_email;
	var latest_favourite =  request.query.favourite;
  var get_fav  = db.ref("User/"+ user_email);
  var dataPromise = new Promise(function(resolve,reject){
    get_fav.once('value',function(snapshot){
      var fav_data = snapshot.val().Favourite;
      resolve(fav_data)
    });
  });
 dataPromise.then(function(fav_data){
  var previous_fav = (fav_data.slice(1, -1)).split(",");
  var latest_fav = (latest_favourite.slice(1, -1)).split(",")
      console.log(latest_fav);
     console.log(previous_fav);
     var check = true;
  var dataPromise2 = new Promise(function(resolve,reject){
  if(latest_fav[0]== "")
  {
    db.ref("Events").once('value',function(snapshot){
       snapshot.forEach(function(childSnapshot){
         var location_key = childSnapshot.key
          db.ref("Events/" +childSnapshot.key).once('value',function(snapshot){
              snapshot.forEach(function(childSnapshot){
                if(childSnapshot.key == previous_fav[0])
                 {
                    var P_interest = childSnapshot.val().interest;
                    var U_interest = parseInt(P_interest) - 1 ;
                    var update_interest = db.ref("Events/" +location_key +"/" + childSnapshot.key);
                    update_interest.update({
                        interest : U_interest.toString()
                    });
                    resolve("success");
                    }
                  });
              }); 
            });
    });    
  }
  if(previous_fav[0] =="")
  {
    db.ref("Events").once('value',function(snapshot){
      snapshot.forEach(function(childSnapshot){
        var location_key = childSnapshot.key
        db.ref("Events/" +childSnapshot.key).once('value',function(snapshot){
          snapshot.forEach(function(childSnapshot){
            if(childSnapshot.key == latest_fav[0])
            {
              var P_interest = childSnapshot.val().interest;
              var U_interest = parseInt(P_interest) + 1 ;
              var update_interest = db.ref("Events/" +location_key +"/" + childSnapshot.key);
              update_interest.update({
                interest : U_interest.toString()
              });
              resolve("success")
            }
          });
        }); 
      });
    });
  }
  else
  {
    if(previous_fav.length < latest_fav.length)
    {
      var add_event = latest_fav[latest_fav.length -1 ];
      console.log("This " + latest_fav[latest_fav.length -1 ] + "Has added");
      db.ref("Events").once('value',function(snapshot){
      snapshot.forEach(function(childSnapshot){
        var location_key = childSnapshot.key
        db.ref("Events/" +childSnapshot.key).once('value',function(snapshot){
          snapshot.forEach(function(childSnapshot){
            if(childSnapshot.key == add_event)
            {
              var P_interest = childSnapshot.val().interest;
              var U_interest = parseInt(P_interest) + 1 ;
              var update_interest = db.ref("Events/" +location_key +"/" + childSnapshot.key);
              update_interest.update({
                interest : U_interest.toString()
              });
              resolve("success")
            }
          });
        }); 
      });
    });
    }
    if(previous_fav.length > latest_fav.length)
    {
      for(var x = 0 ; x < latest_fav.length ; x++)
      {
        for(var y = 0 ; y < previous_fav.length ; y++)
        {
          if(previous_fav[y] != latest_fav[x] && check )
          {
            var remove_event = previous_fav[y];
            console.log("This " + previous_fav[y] + " Has remove");
            db.ref("Events").once('value',function(snapshot){
              snapshot.forEach(function(childSnapshot){
              var location_key = childSnapshot.key
                db.ref("Events/" +childSnapshot.key).once('value',function(snapshot){
                  snapshot.forEach(function(childSnapshot){
                    if(childSnapshot.key == remove_event)
                    {
                      var P_interest = childSnapshot.val().interest;
                      var U_interest = parseInt(P_interest) - 1 ;
                      var update_interest = db.ref("Events/" +location_key +"/" + childSnapshot.key);
                      update_interest.update({
                        interest : U_interest.toString()
                      });
                      resolve("success");
                    }
                  });
              }); 
            });
          });
            check = false;
          }
        }
      }
    }
  }
  });
  dataPromise2.then(function(success){

      var updatefavourite = db.ref("User/" + user_email);
  updatefavourite.update({Favourite : latest_favourite});

            var resultJson ={result :"success"};
          var resultArr = [];
          resultArr.push(resultJson);
          console.log(resultArr);
          response.json(resultArr);
  });
 });
	console.log(user_email);


});

//user
router.get('/:param1', function(request, response) {
	var get = require('../server');
	var db = get.adm.database();

 
  console.log("this is UserAPI page");
 // console.log(request.query);
  var user_email = request.query.user_email;
 // console.log(user_email);
  var dataPromise = new Promise(function(resolve,reject){
  	var get_user = db.ref("User/" + user_email);
  	get_user.once('value',function(snapshot){
  		var User_data = snapshot.val();
  	//	console.log(snapshot.key);
  	if(User_data)
  	{
  		resolve({User_data : User_data , user_key : snapshot.key});
  	}
  	else
  	{
  		resolve({User_data : "no user" , user_key : "no user"});
  	}
  	});
  });
  dataPromise.then(function({User_data,user_key}){
  	if(User_data == "no user")
  	{
  		console.log("no user");
 		//create user 
 		var create_user = db.ref("User/" + user_email);
 		create_user.set({
 			Email : user_email.replace(/\_/g,'.'),
 			Favourite : ",",
 			Loyalty_Points : "99",
 			Rewards : ",",
 			});
 		var push_event = db.ref("User/" + user_email +"/events");
 		push_event.push().set({
 			event_id : "dummy"
 		});
 		 var dataPromise2 = new Promise(function(resolve,reject){
 		 	var get_new_user = db.ref("User/" + user_email);
 		 	get_new_user.once('value',function(snapshot){
 		 		var User_data = snapshot.val();
 		 		if(User_data)
 		 		{
 		 			resolve({User_data : User_data , User_key : snapshot.key});
 		 		}
 		 	});
  		});
 		 //return new user data
 		  dataPromise2.then(function({User_data,User_key}){
 		  	  	var resultJson ={};
  				var resultArr = [];
  				resultJson[User_key] = User_data;
  				resultArr.push(resultJson);
  				console.log(resultArr);
  				response.json(resultArr);
 		  });
  	}
  	else
  	{
  		var resultJson ={};
  		var resultArr = [];
  		resultJson[user_key] = User_data;
  		resultArr.push(resultJson);
  		console.log(resultArr);
  		response.json(resultArr);

  	}
  });
});
//purchase event reward
router.get("/purchase_eventreward/:param1",function(request,response){
  console.log("Purchase Event Rewards");
  var get = require('../server');
  var db = get.adm.database();
  var user_email = request.query.user_email;
  var reward_id = request.query.reward_id;
  var event_id = request.query.event_id;
  //console.log(request.query);
  //get user reward
  var dataPromise = new Promise(function(resolve,reject){
    db.ref("User/" + user_email + "/events").once('value',function(snapshot){
      snapshot.forEach(function(childSnapshot){
        if(childSnapshot.val().event_id == event_id)
        {
          var own_point = childSnapshot.val().reward_system.own_point;
          var own_reward = childSnapshot.val().reward_system.own_reward;
          resolve({own_point : own_point , own_reward : own_reward ,reward_key : childSnapshot.key});
        }
      });
    });
  });
  dataPromise.then(function({own_point,own_reward ,reward_key}){
    //get event reward cost 
    var dataPromise2 = new Promise(function(resolve,reject){
      db.ref("Events").once('value',function(snapshot){
        snapshot.forEach(function(childSnapshot){
          var location_key = childSnapshot.key;
            db.ref("Events/"+ location_key).once('value',function(snapshot){
              snapshot.forEach(function(childSnapshot){
                if(childSnapshot.key == event_id)
                {
                  var rewards = childSnapshot.val().reward.rewards;
                  for(var key in rewards)
                  {
                    if(key == reward_id)
                    {
                      resolve({reward_cost : rewards[key].reward_cost , location_key : location_key});
                    }
                  }
                }
              });
          });
        });
      });
    });
    //check own point and reward determine update or return fail
    dataPromise2.then(function({reward_cost,location_key}){
      console.log(reward_cost);
      console.log(own_point);
      console.log(own_reward);
      console.log(reward_key);
      var own_point_remain = parseInt(own_point) - parseInt(reward_cost);
      console.log(own_point_remain);
      if(parseInt(own_point_remain) >= 0)
      {
        //update own point and own reward
        var update_reward = db.ref("User/" + user_email + "/events/" + reward_key + "/reward_system");
        var updated_own_reward = own_reward + reward_id +","; 
        update_reward.update({
            own_point : own_point_remain.toString(),
            own_reward : updated_own_reward
        });
        //push reward_transaction
        var push_reward_trans = db.ref("Events/" + location_key + "/" + event_id + "/reward_transaction");
        var current_date = new Date();
        push_reward_trans.push().set({
          user_email : user_email,
          rewards_id : reward_id,
          timestamp : current_date.toString()
        });
        var resultObject = { own_point : own_point_remain.toString() , own_reward : updated_own_reward};
        var resultJson = {result : resultObject};
        var resultArr = []
        resultArr.push(resultJson);
        response.json(resultArr);
      }
      else
      {
        var resultObject = { own_point : "fail" ,own_reward : "fail" };
        var resultJson = {result : resultObject};
        var resultArr = []
        resultArr.push(resultJson);
        response.json(resultArr);
      }
    });
  });
});
//purchase reward
router.get("/purchase_reward/:param1",function(request,response){
  console.log("Purchase Rewards");
  var get = require('../server');
  var db = get.adm.database();
  var user_email = request.query.user_email;
  var reward_id = request.query.reward_id;
  console.log(request.query);
  //get user Loyalty_Points
  var dataPromise = new Promise(function(resolve,reject){
    db.ref("User/" + user_email).once('value',function(snapshot){
      resolve({Loyalty_Points :snapshot.val().Loyalty_Points , Rewards : snapshot.val().Rewards});
    });
  });
  dataPromise.then(function({Loyalty_Points,Rewards}){
    console.log(Loyalty_Points);
    //get Reward cost
    var dataPromise2 = new Promise(function(resolve,reject){
      db.ref("Rewards/" + reward_id).once('value',function(snapshot){
        resolve({reward_cost :snapshot.val().Cost});
      });
    });
    dataPromise2.then(function({reward_cost}){
    var Loyalty_Points_remain = parseInt(Loyalty_Points) - parseInt(reward_cost);
    if(Loyalty_Points_remain >= 0)
    {
        //update Loyalty_Points and Rewards
        var update_reward = db.ref("User/" + user_email);
        var updated_rewards = Rewards + reward_id +","; 
        update_reward.update({
            Loyalty_Points : Loyalty_Points_remain.toString(),
            Rewards : updated_rewards
        });
        //push reward_transaction
        var push_reward_trans = db.ref("rewards_transaction");
        var current_date = new Date();
        push_reward_trans.push().set({
          user_email : user_email,
          rewards_id : reward_id,
          timestamp : current_date.toString()
        });
        var resultObject = { Loyalty_Points : Loyalty_Points_remain.toString() , Rewards :updated_rewards };
        var resultJson = {result : resultObject};
        var resultArr = []
        resultArr.push(resultJson);
        response.json(resultArr);
    }
    else
    {
      var resultObject = { Loyalty_Points : "fail" ,Rewards : "fail"};
      var resultJson = {result : resultObject};
      var resultArr = []
      resultArr.push(resultJson);
      response.json(resultArr);
    }
  });
});
});
module.exports = router;