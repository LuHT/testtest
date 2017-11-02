var express = require('express');
var router = express.Router();
/*router.get('/', function(request, response) {
 response.send('Hello World!')
  console.log("this is API page");
});*/


router.get('/:param1', function(request, response) {
	var get = require('../server');
	var db = get.adm.database();

 
  console.log("this is API page");
  console.log(request.query);

 // 	console.log(get.adm.database.ServerValue.TIMESTAMP);


	
  	var ref = db.ref("Events/").child(request.query.city);
	var dataPromise = new Promise(function(resolve,reject){
	ref.once('value',function(snapshot){
		var data = snapshot.val();
		resolve(data);
		
	});
});
dataPromise.then(function(data){
	var SortData;
	var lat1;
	var lon1;
	var DataArr =[];
	//current
	//1.530496, 110.360682
	var lat2 =  parseFloat(request.query.lat);
	var lon2 =  parseFloat(request.query.lng);	

	//console.log(data);
	for(var RDatakey in data )
	{
		var Latlng = data[RDatakey].latlng.split(",");
		var lat1 =   parseFloat(Latlng[0]);
		var lon1 =  parseFloat(Latlng[1]);
		var φ1 = lat1.toRadians(), φ2 = lat2.toRadians(), Δλ = (lon2-lon1).toRadians(), R = 6371e3; // gives d in metres
		var d = Math.acos( Math.sin(φ1)*Math.sin(φ2) + Math.cos(φ1)*Math.cos(φ2) * Math.cos(Δλ) ) * R;
		var Distance = d/1000;
		//console.log("Distance: " + d/1000);//kilometer	

		if(Distance <= 0.5)
		{
			var dats = data[RDatakey];
			var meter = Distance * 1000;
			dats["distance"] = meter;
			var newjson = {};
			newjson[RDatakey] = dats;
			console.log(newjson);
			DataArr.push(newjson);
		}
		else
		{
			delete data[RDatakey];
		}

	}
	//console.log(data);
	//console.log(newjson);


	console.log(DataArr.length);
	//response.send(data);
	response.json(DataArr);
	//res.end();

});
});


Number.prototype.toRadians = function() {
   return this * Math.PI / 180;
}

module.exports = router;