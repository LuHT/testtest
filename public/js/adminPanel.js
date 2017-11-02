
// users and ads 
// number of registered users 
//Admin also has the refresh error
function animateBars() {

	userRegisteredAmount();
	AmountofAdv();
	
	userProgressBar();
	retailerProgressBar();
	adsProgressBar();
	
}

function userProgressBar(){
  var elem = document.getElementById("activeUser");   
  var width = 10;
  var id = setInterval(frame, 15);
  function frame() {
    if (width >= 70) {
      clearInterval(id);
    } else {
      width++; 
      elem.style.width = width + '%'; 
      elem.innerHTML = width * 1  + '%';
    }
  }
}

function retailerProgressBar(){
  var elem = document.getElementById("activeRetailer");   
  var width = 10;
  var id = setInterval(frame, 15);
  function frame() {
    if (width >= 70) {
      clearInterval(id);
    } else {
      width++; 
      elem.style.width = width + '%'; 
      elem.innerHTML = width * 1  + '%';
    }
  }
}

function adsProgressBar(){
  var elem = document.getElementById("activeAds");    
  var width = 10;
  var id = setInterval(frame, 15);
  function frame() {
    if (width >= 70) {
      clearInterval(id);
    } else {
      width++; 
      elem.style.width = width + '%'; 
      elem.innerHTML = width * 1  + '%';
    }
  }
}

function showhideretailer(){
	var authSpanButton = document.getElementById('spanBtn');
	var authenticateRetailerDiv = document.getElementById('authRetailer');
    if (authenticateRetailerDiv.style.display === 'none') {
		$(authenticateRetailerDiv)
			.css('opacity', 0)
			.slideDown("slow")
			.animate(
				{opacity:1},
				{queue: true, duration: 'slow'}
			);
		authSpanButton.className="glyphicon glyphicon-menu-up fa-lg";
		
		
		//Isolate scroll when mouse in table
		var tablebody = document.getElementById('tableb');
		$(tablebody).on( 'mousewheel DOMMouseScroll', function (e) { 
  
		  var e0 = e.originalEvent;
		  var delta = e0.wheelDelta || -e0.detail;

		  this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
		  e.preventDefault();  
		});
		
		
    } else {
		$( authenticateRetailerDiv)
			.css('opacity', 1)
			.animate(
				{opacity:0},
				{queue: true, duration: 'slow'}
			)
			.slideUp({duration:'slow'});
			
		authSpanButton.className="glyphicon glyphicon-menu-down fa-lg";
    }
}

/*function test(){
	var shopname = document.getElementById("shopname");
	shopname.innerHTML = "UNIQLO";
}*/

function userRegisteredAmount()
{

	var User_Amount = firebase.database().ref("User");
	var useramount = new Promise(function(resolve, reject){
	User_Amount.once("value", function(snapshot){
		var amount = snapshot.numChildren();
		if(amount == 0)
		{
			console.log("Not Found:" + amount);
			
			resolve(amount);
		}
		else{
			resolve(amount);
		}
	
		
	});
  });
  
  useramount.then(function(Amt){
	  if(Amt == 0)
	  {
		   console.log("Amount 0 ");
		   
	  }
	  else{
		  console.log("Amount of User :" + Amt);
		  document.getElementById("newUser").innerHTML = " " + Amt;	
	  }
	  
  });
}

function AmountofAdv()
{
	var Ads_Amount = firebase.database().ref("Adv");
	var adsamount = new Promise(function(resolve, reject){
	Ads_Amount.once("value", function(snapshot){
		var amount = snapshot.val();
		
		if(amount == null)
		{
			console.log("Not Found:" + amount);
			
			resolve("Not Found");
		}
		else{
			
			resolve(amount);
		}	
	});
  });
   
  adsamount.then(function(Amt){
	 var sortedAdv = "";
	  var count = 0;
	  if(Amt == "Not found")
	  {
		console.log("Amount 0 ");   
	  }
	  else{
		  for(var key in Amt)
		{
			if(Amt.hasOwnProperty(key))
			{
				var Total = Amt[key];
				sortedAdv += Object.keys(Total)+ ",";	
			}					
		}
		var f = sortedAdv.split(",");
		for(var x = 0 ; x <= f.length-2 ; x++)
		{
			count++;
			for(var y  = x + 1 ; y <= f.length-2 ; y++)
			{
				if(f[x] == f[y])
				{
					//console.log(f[y]);
					count--;
				}
			}
		}
		  console.log("Amount of Adv :" + count);
		  document.getElementById("TotalAds").innerHTML = " " + count;	
	  }
	  
  });
	
}
