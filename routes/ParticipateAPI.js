var express = require('express');
var router = express.Router();
/*router.get('/', function(request, response) {
 response.send('Hello World!')
  console.log("this is API page");
});*/


router.get('/:param1', function(request, response) {
	var get = require('../server');
	var db = get.adm.database();
 	 console.log("this is Participate API page");
  	console.log(request.query);
  	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	if(dd<10) {
    	dd = '0'+dd
	} 
	if(mm<10) {
   		mm = '0'+mm
	} 
	today = yyyy + '-' + mm + '-' + dd;

	
	var current_date = new Date(today)
	
  	var user_email = request.query.user_email;
  	var event_id = request.query.event_id;
  	var ticket_id = request.query.ticket_id;
  	var ticket_expiry_date = request.query.expiry_date;
    var start_date  = request.query.start_date;
  	var expiry_date = new Date(ticket_expiry_date);
    var starting_date = new Date(start_date);
	console.log("Start_date: " + starting_date);
  console.log("End_date: " + expiry_date);
	console.log("Current_date: " + current_date);
  console.log(user_email);
  	//update user
 	if(current_date.getTime() > expiry_date.getTime())
 	{
 			console.log("expired");
      var JsonO = {event_id : "fail", status :"fail"};
 			var resultJson = {result :JsonO};
 			var resultArr = []
 			resultArr.push(resultJson);
 			response.json(resultArr);
 	}
 	else
 	{
      console.log("not expired");
    var get_status = new Promise(function(resolve,reject){
      if(starting_date.getTime()  >  current_date.getTime())
      {
         resolve("up-coming")
      }
      else
      {
        resolve("on-going")
      }
    });
    get_status.then(function(statuss){
    var writeevent_user  = db.ref("User/" + user_email + "/events");
    writeevent_user.push().set({
      event_id : event_id,
      ticket_id : ticket_id,
      status : statuss,
      reward_system :{
        own_point : "99",
        own_reward : ","
      }
    });
    //delete the event id which is "dummy"
      var dataPromise = new Promise(function(resolve,reject){
      db.ref("User/"+user_email+"/events").once('value',function(snapshot){
       resolve(snapshot.val());
      });
  });
  dataPromise.then(function(data){
        console.log(data);
        for(var key in data)
        {
          if(data[key].event_id == "dummy")
          {
            var remove_data = db.ref("User/"+user_email+"/events/" + key);
            remove_data.remove();
          }
        }
  });
    //get event location
    var update_ticket = db.ref("Events");
    var get_eventP_location = new Promise(function(resolve,reject){
        update_ticket.once('value',function(snapshot){
       snapshot.forEach(function(childSnapshot){
        var key = childSnapshot.key;
        
         db.ref("Events/"+ key).once('value',function(snapshot){
          snapshot.forEach(function(childSnapshot){
            var event_key =childSnapshot.key;
            console.log(event_key);
            if(event_id == event_key)
            {
              resolve(key);
            }
            
          });
         });
       });
    });
  });
    get_eventP_location.then(function(location){
    if(ticket_id == "ticket_free")
    {
      console.log("is freee ticket");
      var purchase_ticket =  db.ref("Events/"+ location + "/" + event_id +"/purchase");
        var current_date = new Date();
      purchase_ticket.push().set({
    user_email : user_email,
    event_id : event_id,
    ticket_id : ticket_id,
    timestamp : current_date.toString()
    });
      //update on-going
      var upadate_ongoing  = db.ref("Events/"+location+"/" + event_id);
      upadate_ongoing.once('value',function(snapshot){
        console.log(snapshot.val().on_going);
        var update_ongoing_count = parseInt(snapshot.val().going) +1;
        upadate_ongoing.update({
          going : update_ongoing_count.toString()
        });
      });
    }
    else
    {
      //update
      console.log("is not free ticket");
      var upadate_event_ticket  = db.ref("Events/" + location + "/" + event_id + "/participation/tickets/" + ticket_id);
      var purchase_ticket =  db.ref("Events/"+ location + "/" + event_id +"/purchase");
      upadate_event_ticket.once('value',function(snapshot){
      console.log(snapshot.val().available_ticket);
      var update_available_ticket = parseInt(snapshot.val().available_ticket) -1;
      upadate_event_ticket.update({
        available_ticket : update_available_ticket.toString()
        });
      });
       //update on-going
      var upadate_ongoing  = db.ref("Events/"+location+"/" + event_id);
      upadate_ongoing.once('value',function(snapshot){
        console.log(snapshot.val().on_going);
        var update_ongoing_count = parseInt(snapshot.val().going) +1;
        var current_date = new Date();
        upadate_ongoing.update({
          going : update_ongoing_count.toString()
        });
      });
      purchase_ticket.push().set({
    user_email : user_email,
    event_id : event_id,
    ticket_id : ticket_id,
    timestamp : current_date.toString()
    });
    }

  });
  var resultObject = {event_id : event_id, status : statuss};
  var resultJson = {result : resultObject};
  var resultArr = []
  resultArr.push(resultJson);
  response.json(resultArr);

    });
  }
});
module.exports = router;