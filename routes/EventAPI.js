var express = require('express');
var router = express.Router();
/*router.get('/', function(request, response) {
 response.send('Hello World!')
  console.log("this is API page");
});*/


router.get('/:param1', function(request, response) {
	var get = require('../server');
	var db = get.adm.database();

 
  console.log("this is EventAPI page");
  //console.log(request.query);
  var Event_id = request.query.event_id;
  var lat1 = parseFloat(request.query.lat);
  var lon1 =  parseFloat(request.query.lng);
  var Event_id_arry = (Event_id.slice(1, -1)).split(",");
  console.log(Event_id_arry);
  var Event_Arry = [];
  var DataPromise = new Promise(function(resolve,reject){

  	 var count = 0;
  	var get_event = db.ref("Events");
  	get_event.once('value',function(snapshot){
  		snapshot.forEach(function(childSnapshot){
  			var location_key = childSnapshot.key;
  			db.ref("Events/" + location_key).once('value',function(snapshot){
  				var event_data = snapshot.val();
  				var event_data_length = Object.keys(event_data);
  				//console.log(event_data_length.length);
  				for(var key in event_data)
  				{
  					count++;
  					for(var x = 0 ; x < Event_id_arry.length ; x++)
  					{
  						console.log(count);
	  					if(key == Event_id_arry[x])
	  					{
	  						var Jsondata = {};
	  						Jsondata[key] = event_data[key];
							Event_Arry.push(Jsondata);
	  					}
	  					if(count == event_data_length.length)
	  					{
	  						resolve({Event_Arry:Event_Arry , Event_id_arry :Event_id_arry});
	  					}
  					}	
  				}
  			});

  		});
  	});
  
});
DataPromise.then(function({Event_Arry,event_data_length}){

	if(Event_Arry.length == Event_id_arry.length)
	{
    for(var x = 0 ; x < Event_Arry.length ; x++)
    {
      for(var key in Event_Arry[x])
      {
        var Latlng = Event_Arry[x][key].latlng.split(",");
        var lat2 =   parseFloat(Latlng[0]);
        var lon2 =  parseFloat(Latlng[1]);
        var φ1 = lat1.toRadians(), φ2 = lat2.toRadians(), Δλ = (lon2-lon1).toRadians(), R = 6371e3; // gives d in metres
        var d = Math.acos( Math.sin(φ1)*Math.sin(φ2) + Math.cos(φ1)*Math.cos(φ2) * Math.cos(Δλ) ) * R;
        var Distance = d/1000;
        var meter = Distance * 1000;
        Event_Arry[x][key]["distance"] = meter;
      }
    }
    //console.log(Event_Arry);
		response.json(Event_Arry);
	}
	else
	{
		console.log("something wrong");
		var resultJson = {result : "fail"}
 		var resultArr = []
 		resultArr.push(resultJson);
 		response.json(resultArr);
	}

});
});

Number.prototype.toRadians = function() {
   return this * Math.PI / 180;
}
module.exports = router;