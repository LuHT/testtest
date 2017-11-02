var express = require('express');
var router = express.Router();


function checkSign(req,res,next){
  if(req.session.user)
  {
    console.log("User: " + req.session.user);
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

  var get = require('../server');
  var db = get.adm.database();
  var ref = db.ref("Retailers").orderByChild("Email");
   console.log("This is re");

  var FAuth = get.FireAuth;
 //Get_Data();
  FAuth.auth().onAuthStateChanged(function(user) {
      if(user)
      {
        console.log("jjjjjjjjjjjjjj");
        console.log(user.email);
      }

    });
  var dataPromise = new Promise(function(resolve,reject){
  ref.equalTo(req.session.user).once('value',function(snapshot){
    var data = snapshot.val();
    for(var RDatakey in data )
    {
      var ShopName = data[RDatakey].Shop_Name
      var ShopLocation = data[RDatakey].Location;
      var shop_Category = data[RDatakey].Category;
      var Profile_Pic = data[RDatakey].Profile_pic;
      var key = RDatakey;
    }
    resolve({Retailer_key : key, ShopName : ShopName,ShopLocation :ShopLocation,shop_Category : shop_Category,Profile_Pic : Profile_Pic});
  });
});

dataPromise.then(function({Retailer_key,ShopName,ShopLocation,shop_Category,Profile_Pic}){
  var SLreplaceComma = ShopLocation.replace(/,/g,"@");
  //Store Retailer data to session attribute
  req.session.retailer_shop = ShopName;
  req.session.shopLocation = ShopLocation;
  req.session.shop_Category = shop_Category;
  req.session.retailer_key = Retailer_key;
  req.session.organizer_pic = Profile_Pic;
  console.log(req.session.retailer_key);
  console.log(req.session.organizer_pic);
  var shopCategory = req.session.shop_Category.split(",");
   res.render('retailer',{
    ShopName : ShopName,
    Retailer_Email : req.session.user,
    shopLocation : "@"+SLreplaceComma, 
    shop_Category : shop_Category, 
    shopCategory :shopCategory,
    ProfilePic : Profile_Pic
    });
     //Archive notification
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
    var current_date = new Date(today);
  
    move_notification = db.ref("Retailers/"+ req.session.retailer_key+"/notification");
    move_notification.once('value',function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var expiry_date = new Date(childSnapshot.val().expiry_date);
            console.log(expiry_date);
             console.log(current_date);
            if(current_date.getTime() > expiry_date.getTime())
            {
              console.log("have expired notification_data")
               var notification_key = childSnapshot.key;
               var expiry_notification_data = childSnapshot.val();
              //update the handle attribute to expired
              expiry_notification_data["handles"] = "expired";
/*              var update_status_expired = db.ref("Retailers/" + req.session.retailer_key+ "/notification/" + notification_key);
              update_status_expired.update({
                handles : "expired"
              });*/
             
              //copy expiry_notification to archive_notification
              var expiry_notification = db.ref("Retailers/"+ req.session.retailer_key+ "/archive_notification/" +notification_key);
              expiry_notification.set(expiry_notification_data, function(error) {
                //After copy done....remove the notification at the notification table
              var delete_expiry_notification = db.ref("Retailers/"+ req.session.retailer_key+"/notification/" + notification_key);
              delete_expiry_notification.remove();
           });
            }
            else{
              console.log("no expired notification_data")
            }
        });
    });
  res.end();

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
router.post("/",function(request, response){
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
//get notification count that unread 
router.post("/checknotification",function(request,response){
  console.log("notification checker is here!");
  var get = require("../server");
  var db = get.adm.database();
  var dataPromise = new Promise(function(resolve,reject){
  get_nofication_read = db.ref("Retailers/" + request.session.retailer_key + "/notification");
  get_nofication_read.once('value',function(snapshot){
    var notification_data = snapshot.val();
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
dataPromise.then(function(notification_data){
  var read_count=0;
  if(notification_data == "no notification")
  {
     response.send({notification_count: "no notification"});
  }
  else
  {
    for(var key in notification_data)
    {
      if(notification_data[key].read == "false")
      {
        read_count++;
      }
    }
  }
  response.send({notification_count: read_count.toString()});
   response.end();
});

});
//get own retailer post data
router.post("/getData",function(request, response){
  console.log("getData  is here!");
  var get = require("../server");
  var db = get.adm.database();
  var event_array= [];
  var dataPromise = new Promise(function(resolve,reject){
  var get_event = db.ref("Events");

  get_event.once('value',function(snapshot){
     var event_length;
    if(snapshot.val())
    {
      event_length = (Object.keys(snapshot.val())).length;
    }
    else
    {
      reject("no event");
    }
    var count = 0;
    snapshot.forEach(function(childSnapshot){
      var event_location = childSnapshot.key;
       console.log(event_location);
      db.ref("Events/"+ event_location).once('value',function(snapshot){
        snapshot.forEach(function(childSnapshot){
          var event_key = childSnapshot.key;
          var organizer_name = childSnapshot.val().organizer_name;
          if(organizer_name == request.session.retailer_shop)
          {
            var event_data = childSnapshot.val();
            event_data["event_key"] = childSnapshot.key;
            event_data["organizer_key"] = request.session.retailer_key
            event_array.push(event_data);
          }
          if(count == event_length)
          {
            resolve(event_array);
          }
        });
      });
      count++;
    });
  });
});
dataPromise.then(function(data_event_arry){
  if(data_event_arry.length == 0)
  {
   response.send({organizer_events : "no event"});
    response.end();
  }
  console.log(data_event_arry);
  var sorted_event_data = sortbytimestamp(data_event_arry);
  response.send({organizer_events : sorted_event_data});
  response.end();

}).catch(function(result){
  console.log("result: " + result);
   response.send({organizer_events : result});
    response.end();
  });


});
router.post("/getcollaboration",function(request, response){
  console.log("getcollaboration is here!");
  var get = require("../server");
  var db = get.adm.database();
  var dataPromise = new Promise(function(resolve,reject){
  var get_collaboration = db.ref("Retailers/"+request.session.retailer_key + "/collaboration");
    get_collaboration.once('value', function(snapshot){
      var collaboration = snapshot.val();
      if(collaboration)
      {
          resolve(collaboration);
      }
      else
      {
          resolve("no collaboration");
      }
    
    })
  });
dataPromise.then(function(collaboration){
  if(collaboration != "no collaboration")
  {
    var event_array = [];
    var collaboration_length = Object.keys(collaboration);
    console.log(collaboration_length.length);
    var count = 0;
    var dataPromise2 = new Promise(function(resolve,reject){
  
   
        var get_location = db.ref("Events");
        get_location.once('value', function(snapshot){
          snapshot.forEach(function(childSnapshot){
            var locationkey = childSnapshot.key;
            console.log("kuching")
            db.ref("Events/" + locationkey).once('value',function(snapshot){
              snapshot.forEach(function(childSnapshot){
                console.log(childSnapshot.key);
                for(var key in collaboration)
                {
                  if(collaboration[key].status == "on-going")
                  {
                    if(childSnapshot.key == collaboration[key].event_id)
                    {
                      var event_data = childSnapshot.val();
                      event_data["event_key"] = childSnapshot.key;
                      event_data["post_status"] =collaboration[key].post_status;
                      event_array.push(event_data);
                      count++;
                    }
                    if(count == collaboration_length.length)
                    {
                      resolve(event_array);
                    }
                  }
                  else{
                     console.log("expired");
                  }
                }
              });
            });
          });
        });
    });
    dataPromise2.then(function(event_data){
      var sorted_event_data = sortbytimestamp(event_data);
     response.send({event_data: sorted_event_data});
     response.end();
    });
  }
  else
  {
    response.send({event_data: "no event collaboration"});
     response.end();
  }

});
});
router.post("/event_application",function(request, response){
  var event_key = request.body.eventKey;
  var organizername = request.body.organizername;
  var expdate = request.body.expdate;
  var timestamp = (new Date).getTime();

  console.log("event_application is here!");
  var get = require("../server");
  var db = get.adm.database();
//get check organizer_key
/*var dataPromise = new Promise(function(resolve,reject){
  var get_organizer_key = db.ref("Retailers").orderByChild("Shop_Name");
  get_organizer_key.equalTo("Island's Original").once('value',function(snapshot){
  var organizer_key = Object.keys(snapshot.val())[0];
  resolve(organizer_key);

  });
});*/
  //get event location 
  var dataPromise2 = new Promise(function(resolve,reject){
    db.ref("Events").once('value',function(snapshot){
    snapshot.forEach(function(childSnapshot){
      var location_key = childSnapshot.key;
      db.ref("Events/" + location_key).once('value',function(snapshot){
        snapshot.forEach(function(childSnapshot){
          if(childSnapshot.key == event_key)
          {
            //get organizer_key event 
            var get_organizer_key = db.ref("Retailers").orderByChild("Shop_Name");
            get_organizer_key.equalTo(organizername).once('value',function(snapshot){
               var organizer_key = Object.keys(snapshot.val())[0];
              resolve({location_key:location_key, organizer_key : organizer_key});
            });
          }
        });
      });
    });
  });
  });
dataPromise2.then(function({location_key,organizer_key}){
  console.log(location_key);
  console.log(organizer_key);

  //update event attritube
  var update_collaboration_event = db.ref("Events/" + location_key + "/" +event_key + "/collaboration/collaborator");
   update_collaboration_event.push().set({
    organizer_id : request.session.retailer_key ,
    organizer_name : request.session.retailer_shop,
    organizer_pic : request.session.organizer_pic,
    status : "pending"
   });
   //update sender_organizer collaboration
    /*var sender_organizer_event = db.ref("Retailers/"+request.session.retailer_key+"/collaboration");
    sender_organizer_event.push().set({
    event_id: event_key,
    post_id : "dummy",
    post_status : "false",
    result : "dummy",
    status : "on-going"
   });*/
   //send notification 
    var notification_reciever = db.ref("Retailers/"+organizer_key+"/notification");
    notification_reciever.push().set({
      receiver_id : organizer_key,
      receiver_name : organizername,
      sender_id : request.session.retailer_key,
      sender_name : request.session.retailer_shop,
      event_id : event_key,
      expiry_date :expdate,
      timestamp : timestamp,
      classification : "application",
      read : "false",
      handles : "pending"
    });
    response.send({proceed : "success"});
});

});
router.post("/getDataPublic",function(request, response){
    console.log("getDataPublic  is here!");
  var get = require("../server");
  var db = get.adm.database();
  var Event_array = [];
  var dataPromise = new Promise(function(resolve,reject){
  var count = 0;
db.ref("Events").once('value',function(snapshot){
  if(snapshot.val())
  {
    var location_length = Object.keys(snapshot.val()).length;
    
    snapshot.forEach(function(childSnapshot){
    var location_key = childSnapshot.key;
    db.ref("Events/" + location_key).once('value', function(snapshot){
      snapshot.forEach(function(childSnapshot){
        var Event_data = childSnapshot.val();
        //check collaboration
        if(Event_data.collaboration.collaborate != "off")
        {
          Event_data["event_key"] = childSnapshot.key;
          Event_array.push(Event_data);
        }
       
        if(count == location_length)
        {
          resolve(Event_array);
        }
      });
    });
    count++;
  });
  }
  else
  {
    reject("no event");
  }
});
});
dataPromise.then(function(Event_arrays){
  var event_Pub_array = [];
  var event_sort_pub_array = [];
  //check publicity
  if(Event_arrays.length != 0 )
  {
    //check publicity and check event organizer_name
    for(var x = 0 ; x < Event_arrays.length ; x++)
    {
      var check_publicity = Event_arrays[x].collaboration.publicity;
      if(check_publicity == "on")
      {
        console.log("on");
       
        if(Event_arrays[x].organizer_name != request.session.retailer_shop)
        {
          //console.log("safe");
          event_Pub_array.push(Event_arrays[x]);
        }
      }
  }

  //check retailer_name with the collaborator organizer_name
  for(var x = 0 ; x < event_Pub_array.length ; x++)
  {
    var check_coll_organizer = event_Pub_array[x].collaboration.collaborator;
    var check_coll_organizer_length = Object.keys(check_coll_organizer).length;
    //console.log("length: " + check_coll_organizer_length)
    var check =true;
    var count = 0;
    for(var key in check_coll_organizer)
    {
       //console.log("orL: " + check_coll_organizer[key].organizer_name);
        if(check_coll_organizer[key].organizer_name == request.session.retailer_shop )
        {
           //console.log("ssdsdf");
          check = false;
        }
        if((check_coll_organizer_length-1) == count)
        {
          if(check)
          {
              event_sort_pub_array.push(event_Pub_array[x]);
          }
        }
        count++;
    }
  }
/*  var sorted_event_data = sortbytimestamp(event_sort_pub_array);
    response.send({public_events : sorted_event_data});*/
  //final check
  if(event_sort_pub_array.length != 0 )
  {
    var sorted_event_data = sortbytimestamp(event_sort_pub_array);
    response.send({public_events : sorted_event_data});
  }
  else
  {
      response.send({public_events : "no event"});
  }
   
  }
  else
  {
    response.send({public_events : "no event"});
  }

}).catch(function(result){
  // `  console.log("result: " + result);
  response.send({public_events : result});
    response.end();
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
         console.log("seconds");
    }
    else if (elapsed < msPerHour) {
         timestamp = Math.round(elapsed/msPerMinute) + ' minutes ago';   
         console.log("minutes");
    }

    else if (elapsed < msPerDay ) {
        timestamp = Math.round(elapsed/msPerHour ) + ' hours ago';   
        console.log("hours");
    }

    else if (elapsed < msPerMonth) {
    //console.log("Test1:");
    //Math.round(elapsed/msPerDay) + ' days ago'
        var checkday = Math.round(elapsed/msPerDay); 
    if(checkday == 1)
    {
      timestamp = 'Yesterday';
       console.log("Yesterday");
    }
    else if(checkday >1 && checkday<=7)
    {
      timestamp = Math.round(elapsed/msPerDay) + ' days ago';
      console.log("days");
    }
    else{
      timestamp = "just date nia ba";
        console.log("just");
    }

    } 
  else{
    
    var check = Math.round(elapsed/msPerMonth);
    if(check == 1)
    {
        timestamp = Math.round(elapsed/msPerMonth) + ' Month ago';
          console.log("jusscxct");
    }
    else{
      timestamp = Math.round(elapsed/msPerMonth) + ' Months ago';
        console.log("jussst");
    }
  
  }
  //console.log("Test1:" + elapsed);
  //console.log("Test:" + timestamp);
  return timestamp;
}

module.exports = router;
/*router.post("/getData",function(request, response){
  var error;
  //Retailer+ADv+Sorted by timestamp
  var sorteddata = [];
  var count = 0 ;
  console.log("user" + request.session.user);
  var get = require('../server');
  var db = get.adm.database();

   var ref = db.ref("Retailers").orderByChild("Email");
   ref.equalTo(request.session.user).once('value',function(snapshot){
    var data = snapshot.val();
    var Retailer_key;

    for ( Rkey in data ) {
        Retailer_key = Rkey;
    }
  
    var Retailer_Shop_Name = data[Object.keys(data)].Shop_Name;
    var Retailer_Locations = data[Object.keys(data)].Location.split(",");
    if(Retailer_Shop_Name == null)
    {
      error = "Not found Retailers profile";
    }
    else
    {
      for(var i = 0 ; i <Retailer_Locations.length ; i++)
      {
        //console.log(Re_Location);
        console.log(Retailer_Locations);
        db.ref("Adv/" + Retailer_Locations[i]).orderByChild("Shop_Name").equalTo(Retailer_Shop_Name).once('value',function(snapshot){
        var AdvData = snapshot.val();
        for(var key in AdvData)
        {
        //  console.log(key);
            if(AdvData.hasOwnProperty(key))
            {
              if(AdvData[key].Shop_Name == Retailer_Shop_Name)
              {
                var JSONObj = {};
                  var newdata = new Object(AdvData[key]);
                  newdata ["key"] = key;
                  newdata ["Rkey"] = Retailer_key;
                  //console.log(newdata);
                  sorteddata.push(newdata);
                        
              }
            }
        }
          if((Retailer_Locations.length-1) == count)
          {
                    
            for(var i = 0 ; i <=sorteddata.length-1 ; i++)
            {
              var key = sorteddata[i].key;
            for(var x = i+1 ; x <=sorteddata.length-1 ; x++)
              if(sorteddata[x].key == key && x!=i)
              {
                console.log("same");
                var previousData = sorteddata[i].Location;
                var newDataLoc = sorteddata[x].Location;
                sorteddata[i].Location = previousData + "," + newDataLoc;
                sorteddata.splice(x, 1);
              }     
            }
            // console.log(sorteddata[0].key);
            var sortedtime = sortbytimestamp(sorteddata);
            console.log("sss");
            response.send({AvdData: sortedtime}); 
          }
          count++;
        
      });
    }
  }
  });
});*/
/*
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
    }
    else if (elapsed < msPerHour) {
         timestamp = Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
        timestamp = Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
    //console.log("Test1:");
    //Math.round(elapsed/msPerDay) + ' days ago'
        var checkday = Math.round(elapsed/msPerDay); 
    if(checkday == 1)
    {
      timestamp = 'Yesterday';
    }
    else if(checkday >1 && checkday<=7)
    {
      timestamp = Math.round(elapsed/msPerDay) + ' days ago';
    }
    else{
      timestamp = "just date nia ba";
    }

    } 
  else{
    
    var check = Math.round(elapsed/msPerMonth);
    if(check == 1)
    {
        timestamp = Math.round(elapsed/msPerMonth) + ' Month ago';
    }
    else{
      timestamp = Math.round(elapsed/msPerMonth) + ' Months ago';
    }
  
  }
  //console.log("Test1:" + elapsed);
  //console.log("Test:" + timestamp);
  return timestamp;
}

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
        var timestamp = Converttimestamp(sorteddata[x].Time_Stamp);

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
        
                var timestamp0 = Converttimestamp(sorttime[j-1].Time_Stamp)
                var timestring0 = timestamp0.split(" ");
                var adtime0 = parseInt(timestring0[0]);

                //String timestamp1 = DateUtils.getRelativeTimeSpanString(Long.parseLong(adlist.get(j).getTimestamp()), System.currentTimeMillis(), DateUtils.SECOND_IN_MILLIS).toString();
        var timestamp1 = Converttimestamp(sorttime[j].Time_Stamp)
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
}*/




/*var error;
  //Retailer+ADv+Sorted by timestamp
  var sorteddata = [];
  var count = 0 ;
  console.log("user" + request.session.user);
  var get = require('../server');
  var db = get.adm.database();

   var ref = db.ref("Retailers").orderByChild("Email");
   ref.equalTo(request.session.user).once('value',function(snapshot){
    var data = snapshot.val();
    var Retailer_key;

    for ( Rkey in data ) {
        Retailer_key = Rkey;
    }
  
    var Retailer_Shop_Name = data[Object.keys(data)].Shop_Name;
    var Retailer_Locations = data[Object.keys(data)].Location.split(",");
    if(Retailer_Shop_Name == null)
    {
      error = "Not found Retailers profile";
    }
    else
    {
      for(var i = 0 ; i <Retailer_Locations.length ; i++)
      {
        //console.log(Re_Location);
        console.log(Retailer_Locations);
        db.ref("Adv/" + Retailer_Locations[i]).orderByChild("Shop_Name").equalTo(Retailer_Shop_Name).once('value',function(snapshot){
        var AdvData = snapshot.val();
        for(var key in AdvData)
        {
        //  console.log(key);
            if(AdvData.hasOwnProperty(key))
            {
              if(AdvData[key].Shop_Name == Retailer_Shop_Name)
              {
                var JSONObj = {};
                  var newdata = new Object(AdvData[key]);
                  newdata ["key"] = key;
                  newdata ["Rkey"] = Retailer_key;
                  //console.log(newdata);
                  sorteddata.push(newdata);
                        
              }
            }
        }
          if((Retailer_Locations.length-1) == count)
          {
                    
            for(var i = 0 ; i <=sorteddata.length-1 ; i++)
            {
              var key = sorteddata[i].key;
            for(var x = i+1 ; x <=sorteddata.length-1 ; x++)
              if(sorteddata[x].key == key && x!=i)
              {
                console.log("same");
                var previousData = sorteddata[i].Location;
                var newDataLoc = sorteddata[x].Location;
                sorteddata[i].Location = previousData + "," + newDataLoc;
                sorteddata.splice(x, 1);
              }     
            }
            // console.log(sorteddata[0].key);
            var sortedtime = sortbytimestamp(sorteddata);
            console.log("sss");
            response.send({AvdData: sortedtime}); 
          }
          count++;
        
      });
    }
  }
  });*/