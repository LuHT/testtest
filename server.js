var express = require('express');
var firebase = require('firebase');
var app = express();
var expressValidator = require('express-validator');
var bodyParser = require("body-parser");
var session = require("express-session");
var routes = require('./routes/index');
var retailer = require('./routes/retailer');
var retailerPost = require('./routes/retailerPost');
var retailerNotification = require('./routes/retailerNotification');
var register = require('./routes/register');
var Admin = require('./routes/admin');
var LocationAPI =  require('./routes/LocationAPI');
var ParticipateAPI =  require('./routes/ParticipateAPI');
var EventAPI =  require('./routes/EventAPI');
var UserAPI =  require('./routes/UserAPI');
var TransactionAPI =  require('./routes/TransactionAPI');
var retailerArchive = require('./routes/retailerArchive');
var fileUpload = require('express-fileupload');
//set port 
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(fileUpload());


app.use(session({
    secret: "Youeeee",
    name: "Bargin",
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
app.set('port', (process.env.PORT || 5000));
 var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// views is directory for all template files
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

// routes
app.use('/',routes);
app.use('/retailer',retailer);
app.use('/register',register);
app.use('/admin',Admin);
app.use('/retailerPost',retailerPost);
app.use('/retailerPost/CheckPostInfo', retailerPost);
app.use('/retailerNotification', retailerNotification);
app.use('/retailerNotification/retrieve_event', retailerNotification);
app.use('/retailerNotification/handlenotification', retailerNotification);
app.use('/retailerNotification/collaboratorPost', retailerNotification);
app.use('/retailerArchive',retailerArchive);
app.use('/retailer/getData', retailer);
app.use('/retailer/checknotification', retailer);
app.use('/retailer/getDataPublic', retailer);
app.use('/retailer/getcollaboration', retailer);
app.use('/retailer/collaboratorPost', retailer);
app.use('/retailer/event_application', retailer);
app.use('/R_ASig',routes);
app.use('/LocationAPI', LocationAPI);
app.use('/ParticipateAPI', ParticipateAPI);
app.use('/UserAPI', UserAPI);
app.use('/UserAPI/favourite', UserAPI);
app.use('/UserAPI/purchase_eventreward', UserAPI);
app.use('/UserAPI/purchase_reward', UserAPI);
/*app.use('/UserAPI/collaborate', UserAPI);*/
app.use('/EventAPI', EventAPI);
app.use('/TransactionAPI', TransactionAPI);

//listen
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

var admins = require("firebase-admin");
var serviceAccount = require("./sppm1-6f7df-firebase-adminsdk-rr5tk-75974392aa.json");
var adminss = admins.initializeApp({
  credential: admins.credential.cert(serviceAccount),
  databaseURL: "https://sppm1-6f7df.firebaseio.com"
});


var firebaseClient = firebase.initializeApp({
  serviceAccount:"./sppm1-b8f7a17a13ce.json",
  apiKey: "AIzaSyDbJRXZt4wPpolvFtxw2KBoWhrDRiYubgw",
   databaseURL: "https://sppm1-6f7df.firebaseio.com"
});


var Event_array = [];
var db = admins.database();

var event_Pub_array = [];
/*//get check organizer_key
var dataPromise = new Promise(function(resolve,reject){
  var get_organizer_key = db.ref("Retailers").orderByChild("Shop_Name");
  get_organizer_key.equalTo("Island's Original").once('value',function(snapshot){
  var organizer_key = Object.keys(snapshot.val())[0];
  resolve(organizer_key);

  });
});
dataPromise.then(function(organizer_key){
  //get event location 
  var dataPromise2 = new Promise(function(resolve,reject){
    db.ref("Events").once('value',function(snapshot){
    snapshot.forEach(function(childSnapshot){
      var location_key = childSnapshot.key;
      db.ref("Events/" + location_key).once('value',function(snapshot){
        snapshot.forEach(function(childSnapshot){
          if(childSnapshot.key == "-KxNJKCCtjj81DOsR0gR")
          {
            //get organizer_key event 
            var get_organizer_key = db.ref("Retailers").orderByChild("Shop_Name");
            get_organizer_key.equalTo("Pandora").once('value',function(snapshot){
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
  var update_collaboration_event = db.ref("Events/" + location_key + "/-KxNJKCCtjj81DOsR0gR/collaboration/collaborator");
   update_collaboration_event.push().set({
    organizer_id : "asdasd",
    organizer_name : "asdasd",
    organizer_pic : "asdasd",
    status : "xvxcvxcvxcvxcv"
   });
   //update sender_organizer collaboration
   var sender_organizer_event = db.ref("Retailers/-KpB0K434vQY8uh5Ojky/collaboration");
   sender_organizer_event.push().set({
    event_id: "sdfsdf",
    post_id : "dummy",
    post_status : "dummy",
    result : "dummy",
    status : "dummy"
   });
   //send notification 
    var notification_reciever = db.ref("Retailers/"+organizer_key+"/notification");
    notification_reciever.push().set({
      receiver_id : "timestamp",
      receiver_name : "timestamp",
      sender_id : "timestamp",
      sender_name : "timestamp",
      event_id : "timestamp",
      expiry_date :"timestamp",
      timestamp : "timestamp",
      classification : "application",
      read : "false",
      handles : "pending"
    });
});
});

*/

/*var dataPromise = new Promise(function(resolve,reject){
var get_events_p = db.ref("Events");
get_events_p.once('value',function(snapshot){
   if(snapshot.val())
   {
      var location_event_length = Object.keys(snapshot.val()).length;
      var count = 0;
      snapshot.forEach(function(childSnapshot){
      db.ref("Events/" + childSnapshot.key).once('value',function(snapshot){
        snapshot.forEach(function(childSnapshot){
          var collaboration = childSnapshot.val().collaboration; 
          console.log(collaboration.publicity);
          if(collaboration.publicity)
          {
            if(collaboration.publicity == "on")
            {
              var jsonData = childSnapshot.val();
              jsonData["event_key"] = childSnapshot.key;
              event_Pub_array.push(jsonData);
            }
          }
          if(location_event_length == count)
          {
            console.log("count: " + count);
            resolve(event_Pub_array);
          }
         
        });
      });
        count++;
   });
   }
   else
   {
       reject("no events");
   }
});
});
dataPromise.then(function(event_array){
  console.log(event_array.length);
}).catch(function(result){
  console.log("result: " + result);
  // response.send({organizer_events : result});
    //response.end();
});*/
/*var dataPromise = new Promise(function(resolve,reject){
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
        //console.log("sdfsdf: " + Event_data.collaboration.collaborate);
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
    reject("no events");
  }
});
});
dataPromise.then(function(Event_arrays){
  var event_Pub_array = [];
  //check publicity
  for(var x = 0 ; x < Event_arrays.length ; x++)
  {
    var check_publicity = Event_arrays[x].collaboration.publicity;
    if(check_publicity == "on")
    {
      console.log("on");
      event_Pub_array.push(Event_arrays[x]);
    }
  }
  console.log(Event_arrays.length);
  console.log(event_Pub_array.length);
}).catch(function(result){
  console.log("result: " + result);
  // response.send({organizer_events : result});
    //response.end();
  });
*/
/*var event_array= [];
  var dataPromise = new Promise(function(resolve,reject){
  var get_event = db.ref("Event");

  get_event.once('value',function(snapshot){
    //var event_length = (Object.keys(snapshot.val())).length;
    var count = 0;
    //console.log(snapshot.val());
    if(snapshot.val())
    {
      console.log("not null");
    }
    else{
      reject("null");
    }

  });
});
  dataPromise.then(function(data_event_arry){

  }).catch(function(result){
    console.log("result:" + result);
  });*/

/*      var upadate_ongoing  = db.ref("Events/Kuching/-Kw_BeAJS2TtwMHD-I3o");
      upadate_ongoing.once('value',function(snapshot){
        console.log(snapshot.val().on_going);
        var update_ongoing_count = parseInt(snapshot.val().on_going) +1;
        upadate_ongoing.update({
          on_going : update_ongoing_count.toString()
        });
      });*/
/*var dataPromise = new Promise(function(resolve,reject){
      db.ref("Events").once('value',function(snapshot){

      var location_length = Object.keys(snapshot.val()).length;
        snapshot.forEach(function(childSnapshot){
          var event_location = childSnapshot.key;
          db.ref("Events/" + childSnapshot.key).once('value',function(snapshot){
            snapshot.forEach(function(childSnapshot){
               //console.log(childSnapshot.val().collaborator_post);
                if(childSnapshot.key == "-Kw_BeAJS2TtwMHD-I3o")
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
        if(event_collaborator_post[key].organizer_name = "Sakae Sushi")
        {
          //update collaborator_post status
          var update_state = db.ref("Events/" + event_location + "/-Kw_BeAJS2TtwMHD-I3o/collaborator_post/" +key);
          update_state.update({
            feedback : "You been declined because HAHAAHAHAHAH",
            status : "declined"
          });
          //update notification status
          var update_notification = db.ref("Retailers/" + request.session.retailer_key + "/notification/" + request.body.notification_key);
          update_notification.update({
            handles : "accepted"
          })
          //send post notification 
          var send_notification = db.ref("Retailers/-KkDzwQUYK0wSNqBlOqw/notification");
          send_notification.push().set({
            receiver_id : "sss",
            receiver_name :"sccc",
            sender_id : "zxczxc",
            sender_name : "zxczxc",
            event_id : "zxczxcsdd",
            expiry_date :"zxczxcsdd",
            timestamp : "zxczxcsdd",
            classification : "notification_post",
            read : "false",
            handles : "declined"
          });
          //update collaboration
          db.ref("Retailers/-KkDzwQUYK0wSNqBlOqw/collaboration").once('value',function(snapshot){
             snapshot.forEach(function(childSnapshot){
              if(childSnapshot.val().event_id == "-Kw_BeAJS2TtwMHD-I3o")
              {
                var update_collaboration = db.ref("Retailers/-KkDzwQUYK0wSNqBlOqw/collaboration/" + childSnapshot.key);
                update_collaboration.update({
                  result: "declined",
                  post_status : "false"
                });
              }
             });
          });
          }
        }
    
    });*/

    /*var dataPromise = new Promise(function(resolve,reject){

      db.ref("Events").once('value',function(snapshot){

      var location_length = Object.keys(snapshot.val()).length;
        snapshot.forEach(function(childSnapshot){
          var event_location = childSnapshot.key;
          db.ref("Events/" + childSnapshot.key).once('value',function(snapshot){
            snapshot.forEach(function(childSnapshot){
               //console.log(childSnapshot.val().collaborator_post);
                if(childSnapshot.key == "-Kw_BeAJS2TtwMHD-I3o")
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
        if(event_collaborator_post[key].organizer_name = "Sakae Sushi")
        {
          //update collaborator_post status
          var update_state = db.ref("Events/" + event_location + "/-Kw_BeAJS2TtwMHD-I3o/collaborator_post/" +key);
          update_state.update({
            feedback : "dummy",
            status : "accepted"
          });
          //send post notification 
          var send_notification = db.ref("Retailers/-KkDzwQUYK0wSNqBlOqw/notification");
          send_notification.push().set({
            receiver_id : "sss",
            receiver_name :"sccc",
            sender_id : "zxczxc",
            sender_name : "zxczxc",
            event_id : "zxczxcsdd",
            expiry_date :"zxczxcsdd",
            timestamp : "zxczxcsdd",
            classification : "notification_post",
            read : "false",
            handles : "accepted"
          });
          //update collaboration
          db.ref("Retailers/-KkDzwQUYK0wSNqBlOqw/collaboration").once('value',function(snapshot){
             snapshot.forEach(function(childSnapshot){
              if(childSnapshot.val().event_id == "-Kw_BeAJS2TtwMHD-I3o")
              {
                var update_collaboration = db.ref("Retailers/-KkDzwQUYK0wSNqBlOqw/collaboration/" + childSnapshot.key);
                update_collaboration.update({
                  result: "accepted"
                });
              }
             });
          });
          }
        }
    
    });*/
/*var event_Pub_array = [];
var dataPromise = new Promise(function(resolve,reject){
var get_events_p = db.ref("Events");
get_events_p.once('value',function(snapshot){
   var location_event_length = Object.keys(snapshot.val()).length;
   var count = 0;
   snapshot.forEach(function(childSnapshot){
      db.ref("Events/" + childSnapshot.key).once('value',function(snapshot){
        snapshot.forEach(function(childSnapshot){
          var collaboration = childSnapshot.val().collaboration; 
          //console.log(collaboration);
          if(collaboration.publicity == "on")
          {
            var jsonData = childSnapshot.val();
            jsonData["event_key"] = childSnapshot.key;
            event_Pub_array.push(jsonData);

          }
          if(location_event_length == count)
          {
            resolve(event_Pub_array);
          }
        });
      });
   });
   count++;
});
});

dataPromise.then(function(event_array){
  console.log(event_array);
});*/


/*var event_array= [];
var dataPromise = new Promise(function(resolve,reject){
  var get_event = db.ref("Events");

get_event.once('value',function(snapshot){
  var event_length = (Object.keys(snapshot.val())).length;
  var count = 0;
  snapshot.forEach(function(childSnapshot){
    var event_location = childSnapshot.key;
     console.log(event_location);
    db.ref("Events/"+ event_location).once('value',function(snapshot){
      snapshot.forEach(function(childSnapshot){
        var event_key = childSnapshot.key;
        var organizer_name = childSnapshot.val().organizer_name;
        if(organizer_name == "Pandora")
        {
          var event_data = childSnapshot.val();
          event_data["event_key"] = childSnapshot.key;
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
  console.log(data_event_arry);


});*/


/*var get_event = db.ref("Events"); 
get_event.once('value',function(snapshot){
  snapshot.forEach(function(childSnapshot){
    var event_location = childSnapshot.key
      db.ref("Events/"+ event_location).once('value',function(snapshot){
        snapshot.forEach(function(childSnapshot){
          var event_key = childSnapshot.key
          //console.log(event_key);
          if(event_key == "-Kw_BeAJS2TtwMHD-I3o")
          {
            //check collaborator post_id

            //push collaborator data 
            var push_collaborator = db.ref("Events/" + event_location + "/" + event_key +"/collaborator_post");
            var post_key = push_collaborator.push();
            var postId = post_key.key;
            post_key.set({
              data : "assdf",
              data2 : "vvv"
          });
            console.log(postId);
          }
        });
      });
  });

});*/



/*var db = admins.database();
db.ref("Event").once('value',function(snapshot){
   snapshot.forEach(function(childSnapshot){
    var set_collaborate = db.ref("Event/"+childSnapshot.key);
        set_collaborate.once('value',function(snapshot){

        });

   });

})*/


/*var dataPromise = new Promise(function(resolve,reject){
  db.ref("User/lulu9090@gmail_com/events").once('value',function(snapshot){
      resolve(snapshot.val());
  });
});
dataPromise.then(function(data){
  console.log(data);
  for(var key in data)
  {
    if(data[key].event_id == "dummy")
    {
      var remove_data = db.ref("User/lulu9090@gmail_com/events/" + key);
      remove_data.remove();
    }
  }
});*/


/*  var dataPromise = new Promise(function(resolve,reject){
  var get_collaboration = db.ref("Retailers/-KkDzwQUYK0wSNqBlOqw" + "/collaboration");
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
      console.log(event_data);
    });
  }
  else
  {
    console.log("no collaboration");
  }

});*/
/*   var update_readstatus = db.ref("Retailers")
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

var expiry_date = new Date("2017-10-14");
var current_date = new Date(today)
console.log(expiry_date);
console.log(current_date);

if(current_date.getTime() > expiry_date.getTime())
{
 console.log("expiry_date");
}
else
{
   console.log("no expiry_date");
}*/
/*  var ref = db.ref("Events");
  var dataPromise = new Promise(function(resolve,reject){
    ref.once('value', function(snapshot){
       //console.log(snapshot.val());
       snapshot.forEach(function(childSnapshot){
       var key = childSnapshot.key;
         console.log(key);
          db.ref("Events/"+ key).once('value',function(snapshot){
           snapshot.forEach(function(childSnapshot){
          //  console.log(childSnapshot.val());
            if(childSnapshot.key == "-KwO3RUZBLC-K_sRFfBC")
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
 console.log(data);
  });*/


//accept or decline 
/*var ref = db.ref("Retailers/-KkFEuZPyzftwsEkKE-A/notification/qweqwe");
    ref.update({
      handles : "accept",
      handles_timestamp : "sdfsdf"
    });
  var s = db.ref("Retailers/-KkFEuZPyzftwsEkKE-A/collaborator");
  s.push({
    event_key : "sfsfsdf",
    organizer_name : "name",
    status : "pending",
    expiry_date : "wrwer"
  });*/






 //notification
 /* var ref = db.ref("Retailers").orderByChild("Email");
  var get_notificationP = new Promise(function(resolve,reject){
  ref.equalTo("josh91_lo@hotmail.com").once('value',function(snapshot){
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
        //sorted by read 
        for(var key in data)
        {
          if(data[key].read  != "false")
          { 

              delete data[key];
          }
        }
    }
    else
    {

    }
    
    //To array
    for(var key in data)
    {
      var newdata = new Object(data[key]);
      newdata["notification_key"] = key;
      notification_arry.push(newdata);
    }
    //stored array 
    console.log("before");
    console.log(notification_arry);
    var s = sortbytimestamp(notification_arry);
    console.log("after");
    console.log(s);
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
}*/

setInterval(function(){
  console.log('test');
},60 * 60 * 1000);
// 
/*  var db = admins.database();
  var ref = db.ref("Events").orderByKey();
  var c = new Date().getTime();
  //var days = 30 * 60 * 60 * 1000 * 24;
  var days = 1 * 60 * 60 * 1000 * 24;
  var expiredDate = c - days;

  console.log("Today date: " + c);
  console.log("Days: " + days);
  ref.once('value',function(snapshot){

    snapshot.forEach(function(childSnapshot){
      var key = childSnapshot.key;
    console.log(key);
    db.ref("Events/"+ key).once('value',function(snapshot){
      snapshot.forEach(function(childsSnapshot){
      var keys = childsSnapshot.key;
      var db_path = db.ref("Events/"+ key +"/"+ keys);
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
*/

module.exports = {
	adm : adminss,
  FireAuth : firebaseClient
};




