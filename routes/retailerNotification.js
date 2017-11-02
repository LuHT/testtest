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
  console.log("retailerNotification page loaded");
  var get = require("../server");
  var db = get.adm.database();
   var shopCategory = req.session.shop_Category.split(",");
   res.render('retailerNotification',{shopCategory :shopCategory,ShopName : req.session.retailer_shop});
   res.end();
});


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

router.post("/retrieve_event",function(request,response){
	var get = require("../server");
	var db = get.adm.database();
	console.log("event_re");
	console.log(request.body.eventKey);
  var ref = db.ref("Events");
  var dataPromise = new Promise(function(resolve,reject){
    ref.once('value', function(snapshot){
       //console.log(snapshot.val());
       snapshot.forEach(function(childSnapshot){
       var key = childSnapshot.key;
         console.log(key);
          db.ref("Events/"+ key).once('value',function(snapshot){
           snapshot.forEach(function(childSnapshot){
          //  console.log(childSnapshot.val());
            if(childSnapshot.key == request.body.eventKey)
            {
              var data = childSnapshot.val();
              data["event_key"] = childSnapshot.key;
              resolve({data: data});
            }
          });
      
       });
    });
  });
    });

  dataPromise.then(function(data){
 	response.send({event: data});
   //change status 
    console.log(request.body.notification_key);
    var change_status = db.ref("Retailers/" + request.session.retailer_key + "/notification/" + request.body.notification_key);
    change_status.update({read : "true"});
  });


});
router.post("/handlenotification",function(request,response){
  console.log("Handle notification");
  var get = require("../server");
  var db = get.adm.database();
  var eventkey = request.body.eventKey;
  var senderID = request.body.senderID;
  var receiverID = request.body.receiverID;
  var notification_key = request.body.notification_key;
  var classification = request.body.classification;
  var eventExp = request.body.eventExp;
  var receiverName = request.body.receiverName;
  var senderName = request.body.senderName;
  var result = request.body.result;
  var timestamp = (new Date).getTime();
  console.log(notification_key);
  //invitation accpted // decline
 if(classification == "invitation")
 {
  if(result == "accepted")
  {
     //change receiver handle status and add more collaborator FOR Accept 
    var change_handlestatus = db.ref("Retailers/" + request.session.retailer_key + "/notification/" + request.body.notification_key);
    change_handlestatus.update({handles : "accepted"});

    var setCollaboration = db.ref("Retailers/" + request.session.retailer_key + "/collaboration");
    setCollaboration.push().set({
      event_id : eventkey,
      status : "on-going",
      post_status : "false",
      post_id : "dummy",
      result : "dummy"
    });

    //changes status for sender 
    var ref = db.ref("Events");
    var dataPromise = new Promise(function(resolve,reject){
    ref.once('value', function(snapshot){
       //console.log(snapshot.val());
       snapshot.forEach(function(childSnapshot){
       var key = childSnapshot.key;
         console.log(key);
          db.ref("Events/"+ key).once('value',function(snapshot){
           snapshot.forEach(function(childSnapshot){
          //  console.log(childSnapshot.val());
            if(childSnapshot.key == eventkey)
            {
              resolve({location_key: key});
            }
          });
      
       });
    });
  });
    });
    dataPromise.then(function({location_key}){
   //change status sender
    console.log("getloction:" + location_key);
    var dataPromise2 = new Promise(function(resolve,reject){
    var getCollaboration = db.ref("Events/" + location_key + "/" +eventkey +"/collaboration/collaborator" );
      getCollaboration.once('value', function(snapshot){
           snapshot.forEach(function(childSnapshot){
             var key = childSnapshot.key;
             var organizer_id = childSnapshot.val().organizer_id;
             console.log(organizer_id);
            if(organizer_id == receiverID)
            {
              resolve({collaborator_key :childSnapshot.key })
            }
           });

      });
    });
    dataPromise2.then(function({collaborator_key}){
        //change status sender
          console.log("getcol:" + collaborator_key);
        var getCollaboration = db.ref("Events/" + location_key + "/" +eventkey +"/collaboration/collaborator/" +collaborator_key);
        getCollaboration.update({status : "accepted"});
      //notification to sender 
      var sender_notification = db.ref("Retailers/" + senderID + "/notification")
      sender_notification.push().set({
        receiver_id : senderID,
        receiver_name : senderName,
        sender_id : receiverID,
        sender_name : receiverName,
        event_id : eventkey,
        expiry_date : eventExp,
        timestamp : timestamp,
        classification : "notification_invitation",
        read : "false",
        handles : "accepted"
      });

     response.send({result: "success"});
  });
  });
  }

  if(result == "declined")
  {
    //change receiver handle status and add more collaborator FOR Accpet 
    var change_handlestatus = db.ref("Retailers/" + request.session.retailer_key + "/notification/" + request.body.notification_key);
    change_handlestatus.update({handles : "declined"});

        //changes status for sender 
    var ref = db.ref("Events");
    var dataPromise = new Promise(function(resolve,reject){
    ref.once('value', function(snapshot){
       //console.log(snapshot.val());
       snapshot.forEach(function(childSnapshot){
       var key = childSnapshot.key;
         console.log(key);
          db.ref("Events/"+ key).once('value',function(snapshot){
           snapshot.forEach(function(childSnapshot){
          //  console.log(childSnapshot.val());
            if(childSnapshot.key == eventkey)
            {
              resolve({location_key: key});
            }
          });
      
       });
    });
  });
    });
    dataPromise.then(function({location_key}){
   //change status sender
    console.log("getloction:" + location_key);
    var dataPromise2 = new Promise(function(resolve,reject){
    var getCollaboration = db.ref("Events/" + location_key + "/" +eventkey +"/collaboration/collaborator" );
      getCollaboration.once('value', function(snapshot){
           snapshot.forEach(function(childSnapshot){
             var key = childSnapshot.key;
             var organizer_id = childSnapshot.val().organizer_id;
             console.log(organizer_id);
            if(organizer_id == receiverID)
            {
              resolve({collaborator_key :childSnapshot.key })
            }
           });

      });
    });
    dataPromise2.then(function({collaborator_key}){
        //change status sender
          console.log("getcol:" + collaborator_key);
        var getCollaboration = db.ref("Events/" + location_key + "/" +eventkey +"/collaboration/collaborator/" +collaborator_key);
        getCollaboration.update({status : "declined"});
      //notification to sender 
      var sender_notification = db.ref("Retailers/" + senderID + "/notification")
      sender_notification.push().set({
        receiver_id : senderID,
        receiver_name : senderName,
        sender_id : receiverID,
        sender_name : receiverName,
        event_id : eventkey,
        expiry_date : eventExp,
        timestamp : timestamp,
        classification : "notification_invitation",
        read : "false",
        handles : "declined"
      });
       response.send({result: "success"});
  });
  });
  }
}
//application accpted // decline

if(classification == "application")
{
  console.log("classification: " + classification);
  if(result == "accepted")
  {
    console.log("classification2: " + classification);
     //change receiver handle status and add more collaborator FOR Accpet 
    var change_handlestatus = db.ref("Retailers/" + request.session.retailer_key + "/notification/" + request.body.notification_key);
    change_handlestatus.update({handles : "accepted"});

    var setCollaboration = db.ref("Retailers/" + senderID + "/collaboration");
    setCollaboration.push().set({
      event_id : eventkey,
      status : "on-going",
      post_status : "false",
      post_id : "dummy",
      result : "dummy"
    });

    //changes status for receiver
    var ref = db.ref("Events");
    var dataPromise = new Promise(function(resolve,reject){
    ref.once('value', function(snapshot){
       //console.log(snapshot.val());
       snapshot.forEach(function(childSnapshot){
       var key = childSnapshot.key;
         console.log(key);
          db.ref("Events/"+ key).once('value',function(snapshot){
           snapshot.forEach(function(childSnapshot){
          //  console.log(childSnapshot.val());
            if(childSnapshot.key == eventkey)
            {
              resolve({location_key: key});
            }
          });
      
       });
    });
  });
    });
    dataPromise.then(function({location_key}){
   //change status sender
    console.log("getloction:" + location_key);
    var dataPromise2 = new Promise(function(resolve,reject){
    var getCollaboration = db.ref("Events/" + location_key + "/" +eventkey +"/collaboration/collaborator" );
      getCollaboration.once('value', function(snapshot){
           snapshot.forEach(function(childSnapshot){
             var key = childSnapshot.key;
             var organizer_id = childSnapshot.val().organizer_id;
             console.log(organizer_id);
            if(organizer_id == senderID)
            {
              resolve({collaborator_key :childSnapshot.key })
            }
           });

      });
    });
    dataPromise2.then(function({collaborator_key}){
        //change status sender
          console.log("getcol:" + collaborator_key);
        var getCollaboration = db.ref("Events/" + location_key + "/" +eventkey +"/collaboration/collaborator/" +collaborator_key);
        getCollaboration.update({status : "accepted"});
      //notification to sender 
      var sender_notification = db.ref("Retailers/" + senderID + "/notification")
      sender_notification.push().set({
        receiver_id : senderID,
        receiver_name : senderName,
        sender_id : receiverID,
        sender_name : receiverName,
        event_id : eventkey,
        expiry_date : eventExp,
        timestamp : timestamp,
        classification : "notification_application",
        read : "false",
        handles : "accepted"
      });

    response.send({result: "success"});
  });
  });
  }
  if(result == "declined")
  {
    //change receiver handle status and add more collaborator FOR Accpet 
    var change_handlestatus = db.ref("Retailers/" + request.session.retailer_key + "/notification/" + request.body.notification_key);
    change_handlestatus.update({handles : "declined"});

        //changes status for sender 
    var ref = db.ref("Events");
    var dataPromise = new Promise(function(resolve,reject){
    ref.once('value', function(snapshot){
       //console.log(snapshot.val());
       snapshot.forEach(function(childSnapshot){
       var key = childSnapshot.key;
         console.log(key);
          db.ref("Events/"+ key).once('value',function(snapshot){
           snapshot.forEach(function(childSnapshot){
          //  console.log(childSnapshot.val());
            if(childSnapshot.key == eventkey)
            {
              resolve({location_key: key});
            }
          });
      
       });
    });
  });
    });
    dataPromise.then(function({location_key}){
   //change status sender
    console.log("getloction:" + location_key);
    var dataPromise2 = new Promise(function(resolve,reject){
    var getCollaboration = db.ref("Events/" + location_key + "/" +eventkey +"/collaboration/collaborator" );
      getCollaboration.once('value', function(snapshot){
           snapshot.forEach(function(childSnapshot){
             var key = childSnapshot.key;
             var organizer_id = childSnapshot.val().organizer_id;
             console.log(organizer_id);
            if(organizer_id == senderID)
            {
              resolve({collaborator_key :childSnapshot.key })
            }
           });

      });
    });
    dataPromise2.then(function({collaborator_key}){
        //change status sender
          console.log("getcol:" + collaborator_key);
        var getCollaboration = db.ref("Events/" + location_key + "/" +eventkey +"/collaboration/collaborator/" +collaborator_key);
        getCollaboration.update({status : "declined"});
      //notification to sender 
      var sender_notification = db.ref("Retailers/" + senderID + "/notification")
      sender_notification.push().set({
        receiver_id : senderID,
        receiver_name : senderName,
        sender_id : receiverID,
        sender_name : receiverName,
        event_id : eventkey,
        expiry_date : eventExp,
        timestamp : timestamp,
        classification : "notification_application",
        read : "false",
        handles : "declined"
      });

         response.send({result: "success"});
  });
  });
  }
}

//post 
if(classification == "request_post")
{
  if(result == "accepted")   
  {
  var dataPromise = new Promise(function(resolve,reject){

      db.ref("Events").once('value',function(snapshot){

      var location_length = Object.keys(snapshot.val()).length;
        snapshot.forEach(function(childSnapshot){
          var event_location = childSnapshot.key;
          db.ref("Events/" + childSnapshot.key).once('value',function(snapshot){
            snapshot.forEach(function(childSnapshot){
               //console.log(childSnapshot.val().collaborator_post);
                if(childSnapshot.key == eventkey)
                {
                  var event_collaborator_post =childSnapshot.val().collaborator_post;
                  resolve({event_location : event_location , event_collaborator_post : event_collaborator_post});
                } 
            });
          });
        });
      });
    });
    dataPromise.then(function({event_location,event_collaborator_post}){
      console.log(event_location);
      console.log(event_collaborator_post);
      for(var key in event_collaborator_post)
      {
        if(event_collaborator_post[key].organizer_name = senderName)
        {
          //update collaborator_post status
          var update_state = db.ref("Events/" + event_location + "/"+eventkey+"/collaborator_post/" +key);
          update_state.update({
            feedback : "dummy",
            status : "accepted"
          });
          //update notification status
          var update_notification = db.ref("Retailers/" + request.session.retailer_key + "/notification/" + request.body.notification_key);
          update_notification.update({
            handles : "accepted"
          })
          //send post notification 
          var send_notification = db.ref("Retailers/"+senderID+"/notification");
          send_notification.push().set({
            receiver_id : senderID,
            receiver_name :senderName,
            sender_id :receiverID,
            sender_name : receiverName,
            event_id : eventkey,
            expiry_date :eventExp,
            timestamp : timestamp,
            classification : "notification_post",
            read : "false",
            handles : "accepted"
          });
          //update collaboration
          db.ref("Retailers/"+senderID+"/collaboration").once('value',function(snapshot){
             snapshot.forEach(function(childSnapshot){
              if(childSnapshot.val().event_id == eventkey)
              {
                var update_collaboration = db.ref("Retailers/"+senderID+"/collaboration/" + childSnapshot.key);
                update_collaboration.update({
                  result: "accepted"
                });
              }
             });
          });
          }
        }
          response.send({result: "success"});
    });
  }
  if(result == "declined")   
  {
      var eventkey = request.body.eventKey;
  var senderID = request.body.senderID;
  var receiverID = request.body.receiverID;
  var notification_key = request.body.notification_key;
  var classification = request.body.classification;
  var eventExp = request.body.eventExp;
  var receiverName = request.body.receiverName;
  var senderName = request.body.senderName;
  var result = request.body.result;
  var timestamp = (new Date).getTime();
  var feedback = request.body.feedback;
    var dataPromise = new Promise(function(resolve,reject){
      db.ref("Events").once('value',function(snapshot){

      var location_length = Object.keys(snapshot.val()).length;
        snapshot.forEach(function(childSnapshot){
          var event_location = childSnapshot.key;
          db.ref("Events/" + childSnapshot.key).once('value',function(snapshot){
            snapshot.forEach(function(childSnapshot){
               //console.log(childSnapshot.val().collaborator_post);
                if(childSnapshot.key == eventkey)
                {
                  var event_collaborator_post =childSnapshot.val().collaborator_post;
                  resolve({event_location : event_location , event_collaborator_post : event_collaborator_post});
                } 
            });
          });
        });
      });
    });
    dataPromise.then(function({event_location,event_collaborator_post}){
      console.log(event_location);
      console.log(event_collaborator_post);
      for(var key in event_collaborator_post)
      {
        if(event_collaborator_post[key].organizer_name = senderName)
        {
          //update collaborator_post status
          var update_state = db.ref("Events/" + event_location + "/"+eventkey+"/collaborator_post/" +key);
          update_state.update({
            feedback : feedback,
            status : "declined"
          });
          
          //update notification status
          var update_notification = db.ref("Retailers/" + request.session.retailer_key + "/notification/" + request.body.notification_key);
          update_notification.update({
            handles : "declined"
          })
          //send post notification 
          var send_notification = db.ref("Retailers/"+senderID+"/notification");
          send_notification.push().set({
            receiver_id : senderID,
            receiver_name :senderName,
            sender_id :receiverID,
            sender_name : receiverName,
            event_id : eventkey,
            expiry_date :eventExp,
            timestamp : timestamp,
            classification : "notification_post",
            read : "false",
            handles : "declined"
          });
          //update collaboration
          db.ref("Retailers/"+ senderID+"/collaboration").once('value',function(snapshot){
             snapshot.forEach(function(childSnapshot){
              if(childSnapshot.val().event_id == eventkey)
              {
                var update_collaboration = db.ref("Retailers/"+senderID+"/collaboration/" + childSnapshot.key);
                update_collaboration.update({
                  result: "declined",
                  post_status : "false"
                });
              }
             });
          });
          }
        }
          response.send({result: "success"});
    });
  }
}

});




router.post("/notification",function(request,response){
	console.log("notification checker is here!");
	var get = require("../server");
	var db = get.adm.database();
	//notification
  var ref = db.ref("Retailers").orderByChild("Email");
  var get_notificationP = new Promise(function(resolve,reject){
  ref.equalTo(request.session.user).once('value',function(snapshot){
    var data = snapshot.val();

    var notification_data = data[Object.keys(data)].notification;
    if(notification_data)
    {
        resolve(notification_data);
    }
    else
    {
        resolve("no notification");
    }
   

  });
});
  get_notificationP.then(function(data){
    var notification_arry = [];
    if(data !="no notification")
    {
        //sorted by handle invitation // application
        for(var key in data)
        {
          if(data[key].handles  == "accepted" || data[key].handles  == "declined" )
          { 
             if(data[key].classification == "invitation" || data[key].classification == "application" || data[key].classification == "request_post" ||  data[key].classification == "notification_post")
             {
                delete data[key];
             }
          }
        }
      //To array
     for(var key in data)
     {
      var newdata = new Object(data[key]);
      newdata["notification_key"] = key;
      notification_arry.push(newdata);
      }
      var s = sortbytimestamp(notification_arry);
      response.send({notification: s});
    }
    else
    {
       response.send({notification: "no notification"});
    }
    
   
  });
 
});
router.post("/collaboratorPost",function(request,response){
  var get = require("../server");
  var db = get.adm.database();
  var collaborator_data = request.body;

  collaborator_data["organizer_pic"] = request.session.organizer_pic;
  var event_keys_col = collaborator_data.event_key;
  delete collaborator_data.event_key;
  //console.log(collaborator_data);
  /*response.send({result :"success"});*/
   //for collaborator post first or re-update the post if decline
  var dataPromise = new Promise(function(resolve,reject){
    var checkPostid = db.ref("Retailers/" + request.session.retailer_key + "/collaboration");
    checkPostid.once('value', function(snapshot){
      var data = snapshot.val();
      var data_lenght = Object.keys(snapshot.val()).length;
      resolve({data : data , data_lenght :data_lenght });
  });
});
  dataPromise.then(function({data,data_lenght}){
    var count = 0;
   
    for(var key in data)
    {
      if(data[key].event_id == event_keys_col)
      {
        console.log(data[key].post_id);
        //check post_id
        if(data[key].post_id == "dummy") 
        {
           var keys = key;

          var get_event = db.ref("Events"); 
            get_event.once('value',function(snapshot){
              snapshot.forEach(function(childSnapshot){
                var event_location = childSnapshot.key
                db.ref("Events/"+ event_location).once('value',function(snapshot){
                  snapshot.forEach(function(childSnapshot){
                    var organizer = childSnapshot.val().organizer_name;
                   // console.log("sdfsdf: " + organizer);
                    var event_key = childSnapshot.key;
                    var end_date = childSnapshot.val().end_date;
                  if(event_key == event_keys_col)
                  {
                    //push collaborator data 

                    var push_collaborator = db.ref("Events/" + event_location + "/" + event_key +"/collaborator_post");
                    var post_key = push_collaborator.push();
                    var postId = post_key.key;
                    console.log(collaborator_data);
                    collaborator_data["status"] = "pending";
                    collaborator_data["feedback"] = "dummy";
                    collaborator_data["organizer_id"] = request.session.retailer_key;
                    post_key.set(
                    collaborator_data
                    );
                    //send notification to organizer
                    var timestamp = (new Date).getTime();
                    var get_organizer_key = db.ref("Retailers").orderByChild("Shop_Name");
                    get_organizer_key.equalTo(organizer).once('value',function(snapshot){
                      var organizer_key = Object.keys(snapshot.val());
                    var send_notification = db.ref("Retailers/"+organizer_key[0]+"/notification");
                    send_notification.push().set({
                      receiver_id : organizer_key[0],
                      receiver_name : organizer,
                      sender_id : request.session.retailer_key,
                      sender_name : collaborator_data.organizer_name,
                      event_id : event_key,
                      expiry_date :end_date,
                      timestamp : timestamp,
                      classification : "request_post",
                      read : "false",
                      handles : "pending"
                    });
                    });
                    console.log("asccc: " + keys);
                    var checkPostid = db.ref("Retailers/" + request.session.retailer_key + "/collaboration/" + keys);
                    checkPostid.update({post_id : postId , post_status : "true" , result : "pending"});
                      response.send({proceed: "success"}); 
                  }
              });
             });
           });
          });
        }
        else
        {
           var keys = key;
           var previous_post_id = data[key].post_id
         //reupdate collabotor post attribute 
            var get_event = db.ref("Events"); 
            get_event.once('value',function(snapshot){
              snapshot.forEach(function(childSnapshot){
                var event_location = childSnapshot.key
                  console.log("ever: "  + keys);
                db.ref("Events/"+ event_location).once('value',function(snapshot){
                   
                  snapshot.forEach(function(childSnapshot){
                      var end_date = childSnapshot.val().end_date;
                      var organizer = childSnapshot.val().organizer_name;
                    console.log("organizer_name: " +organizer);
                    var event_key = childSnapshot.key;
                  if(event_key == event_keys_col)
                  {
                    collaborator_data["status"] = "pending";
                    collaborator_data["feedback"] = "dummy";
                    var update_collaborator = db.ref("Events/" + event_location + "/" + event_key +"/collaborator_post/" +previous_post_id);
                    update_collaborator.update(collaborator_data);
                    console.log("re upadte");
                    //send notification to organizer
                    var timestamp = (new Date).getTime();
                    var get_organizer_key = db.ref("Retailers").orderByChild("Shop_Name");
                    get_organizer_key.equalTo(organizer).once('value',function(snapshot){
                      var organizer_key = Object.keys(snapshot.val());
                    var send_notification = db.ref("Retailers/"+organizer_key[0]+"/notification");
                    send_notification.push().set({
                      receiver_id : organizer_key[0],
                      receiver_name : organizer,
                      sender_id : request.session.retailer_key,
                      sender_name : collaborator_data.organizer_name,
                      event_id : event_key,
                      expiry_date :end_date,
                      timestamp : timestamp,
                      classification : "request_post",
                      read : "false",
                      handles : "pending"
                    });
                    });
                    var checkPostid = db.ref("Retailers/"+ request.session.retailer_key +"/collaboration/" + keys);
                    checkPostid.update({post_status : "true" , result : "pendings"});
                      response.send({proceed: "success"}); 
                  }
              });
             });
           });
          });
        }
      }
    }
  });

});
function sortbytimestamp(sorteddata)
{
  var seconds = [];
  var minutes = [];
  var hours = [];
  var day = [];
  var yesterday = [];
  var others = [];
  //var sorted = [];
  //console.log(sorteddata.length);
  //console.log(sorteddata);
  for(var x = 0 ; x <= sorteddata.length-1 ; x++)
  {
    //var adv = sorteddata[x];
  
      
        //convert to time ago
        var timestamp = Converttimestamp(sorteddata[x].timestamp);

        //console.log(timestamp);
        if(timestamp.includes("seconds ago")){
          seconds.push(sorteddata[x]);
        }else if(timestamp.includes("minutes ago")){
          minutes.push(sorteddata[x]);
        }else if(timestamp.includes("hours")){
          hours.push(sorteddata[x]);
        }else if(timestamp.includes("Yesterday")){
          yesterday.push(sorteddata[x]);
        }else if(timestamp.includes("days")){
          day.push(sorteddata[x]);
        }else {
          others.push(sorteddata[x]);
        }
  }
  
        //start sorting
         if(seconds.length>1){
          seconds = sortbytime(seconds);
        }

        if(minutes.length>1){
          minutes = sortbytime(minutes);
        }

        if(hours.length>1){
          hours = sortbytime(hours);
        }

        if(day.length>1){
          day = sortbytime(day);
        }
  
    //all shopping mall sorted by time
    var sorted;
    sorted = seconds.concat(minutes,hours,yesterday,day,others);
    //console.log(sorted);
    return sorted;
}

function sortbytime(sorttime)
{
  var n = sorttime.length;
  var temp;
  
    for(var i=0; i < n; i++){
            for(var j=1; j < (n-i); j++){
        //DateUtils.getRelativeTimeSpanString(Long.parseLong(adlist.get(j-1).getTimestamp()), System.currentTimeMillis(), DateUtils.SECOND_IN_MILLIS).toString();
        
                var timestamp0 = Converttimestamp(sorttime[j-1].timestamp)
                var timestring0 = timestamp0.split(" ");
                var adtime0 = parseInt(timestring0[0]);

                //String timestamp1 = DateUtils.getRelativeTimeSpanString(Long.parseLong(adlist.get(j).getTimestamp()), System.currentTimeMillis(), DateUtils.SECOND_IN_MILLIS).toString();
        var timestamp1 = Converttimestamp(sorttime[j].timestamp)
                var timestring1 = timestamp1.split(" ");
                var adtime1 =  parseInt(timestring1[0]);


                if(adtime0 > adtime1){
                    //swap elements
                    temp = sorttime[j-1];
          sorttime[j-1] = sorttime[j];
                    sorttime[j]= temp;
                }

            }
        }
    return sorttime;
}
function Converttimestamp(TimeStamps)
{
  //console.log("timestamp here");
  var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
  var current = new Date();

   var elapsed = current - TimeStamps;
  var timestamp="ss";
  
    if (elapsed < msPerMinute) {
         timestamp = Math.round(elapsed/1000) + ' seconds ago';   
        // console.log("seconds");
    }
    else if (elapsed < msPerHour) {
         timestamp = Math.round(elapsed/msPerMinute) + ' minutes ago';   
         //console.log("minutes");
    }

    else if (elapsed < msPerDay ) {
        timestamp = Math.round(elapsed/msPerHour ) + ' hours ago';   
        //console.log("hours");
    }

    else if (elapsed < msPerMonth) {
    //console.log("Test1:");
    //Math.round(elapsed/msPerDay) + ' days ago'
        var checkday = Math.round(elapsed/msPerDay); 
    if(checkday == 1)
    {
      timestamp = 'Yesterday';
       //console.log("Yesterday");
    }
    else if(checkday >1 && checkday<=7)
    {
      timestamp = Math.round(elapsed/msPerDay) + ' days ago';
      //console.log("days");
    }
    else{
      timestamp = "just date nia ba";
       // console.log("just");
    }

    } 
  else{
    
    var check = Math.round(elapsed/msPerMonth);
    if(check == 1)
    {
        timestamp = Math.round(elapsed/msPerMonth) + ' Month ago';
        //  console.log("jusscxct");
    }
    else{
      timestamp = Math.round(elapsed/msPerMonth) + ' Months ago';
      //  console.log("jussst");
    }
  
  }
  //console.log("Test1:" + elapsed);
  //console.log("Test:" + timestamp);
  return timestamp;
}

module.exports = router;