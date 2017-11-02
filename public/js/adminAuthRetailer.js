
//Filling retailer list into admin retailer table
function fillAuthRetailer(data){
	var countNewRetailers = 0;
	for(var key in data)
	{//
	
		if(data.hasOwnProperty(key))
		{
			if(key != "Profile")
			{
					var container = document.getElementById("tableb");
	
			var shopname = data[key].Shop_Name.replace(/'/g,"");
			var location = data[key].Location;
			var email = data[key].Email;
			container.innerHTML += '<tr id="'+key+'" data-toggle="modal" data-target="#myModal" data-id ="'+key+'"  onclick="confirmationDialog(\''+key+'\',\''+data[key].Category+'\',\''+email+'\',\''+location+'\',\''+data[key].Phone_number+'\',\''+data[key].Profile_pic+'\',\''+shopname+'\',\''+this+'\')">'
						+ '<td>'+shopname+'</td>'
						+'<td>'+location+'</td>'
						+'<td>'+email+'</td>'
						+'<td><a id="viewHover">view</a></td>'
						+'</tr>';
			countNewRetailers++;
			}
		
		}
	}
	document.getElementById("newRetailers").innerHTML = countNewRetailers;
	console.log( document.getElementById("tableb"));
}
function getKey(){
	
	var sorteddata = [];
	var checkLoc = [] ;
	var count = 0 ;
	
					var getJSON = function(url) {
					return new Promise(function(resolve, reject) {
					var xhr = new XMLHttpRequest();
					
					xhr.open('get', url, true);
					xhr.responseType = 'json';
					xhr.onload = function() {
					  var status = xhr.status;
					  if (status == 200){
						resolve(xhr.response);
					  }else{
						reject(status);
					  }
					};
					xhr.send();
				  });
				};

				getJSON('https://sppm1-6f7df.firebaseio.com/Admin.json?&print=pretty').then(function(data){
					//drawPanel(data);
					fillAuthRetailer(data);
					console.log(data);
				}, function(status) { //error detection.... 
				  alert('Something went wrong.');
				});	

				getJSON('https://sppm1-6f7df.firebaseio.com/Retailers.json?&print=pretty').then(function(retailerData){
					//drawPanel(data);
					var countR = 0;
					for(var key in retailerData)
					{
						if(retailerData.hasOwnProperty(key))
						{
							countR ++;
						}
					}
					document.getElementById("numRetailers").innerHTML = " " + countR;	
				}, function(status) { //error detection.... 
				  alert('Something went wrong.');
				});	
}

function confirmationDialog(key,category,email,location,phoneno,profile,shopnames){

	var Selcetedrow = document.getElementById(key);
	var shopname = document.getElementById("shopname");
	shopname.innerHTML = shopnames;
	
	var profilepicture = document.getElementById("profilePic");
	profilepicture.src = profile;
	console.log(profile);
	console.log(profilepicture);
	
	var cate = document.getElementById("scategory");
	cate.innerHTML = " "+category;
	
	var locate = document.getElementById("slocation");
	locate.innerHTML = " "+location;
	
	var semail = document.getElementById("semail");
	semail.innerHTML = " "+email;
	
	var sphoneno = document.getElementById("sphone");
	sphoneno.innerHTML = " "+phoneno;
	
	var AcceptBtn = document.getElementById("AcceptBtn");
	var DeclineBtn = document.getElementById("DeclineBtn");
	var id = $(Selcetedrow).attr('data-id');
	
	console.log("sss"); 
	console.log(id);
	$('#myModal').data('data-id',id);
}

//create Retailer
function createRetailer(passwords,Email)
{
	console.log("Create Here");
	console.log(passwords +"   "+Email);
var config = {
			//lu
			apiKey: "AIzaSyDbJRXZt4wPpolvFtxw2KBoWhrDRiYubgw",
			authDomain: "sppm1-6f7df.firebaseapp.com",
			databaseURL: "https://sppm1-6f7df.firebaseio.com",
			projectId: "sppm1-6f7df",
			storageBucket: "sppm1-6f7df.appspot.com",
			messagingSenderId: "318196887976"
  };
 var secondaryApp =   firebase.initializeApp(config,"user");
	secondaryApp.auth().createUserWithEmailAndPassword(Email, passwords).then(function(firebaseUser) {
    console.log("User " + firebaseUser.uid + " created successfully!");
});


	secondaryApp.auth().onAuthStateChanged(function(user) {
	    if (user) {
		console.log("Sign in user : " + user.uid);
		console.log("Sign in user : " + user.email);
		secondaryApp.auth().currentUser.sendEmailVerification().then(function() {
        // Email Verification sent!
        // [START_EXCLUDE]
        console.log('Email Verification Sent!');
        // [END_EXCLUDE]
      });
			secondaryApp.auth().signOut();
		}
		else{
		console.log("no user");
		}
});
}
function initFirebase()
{
	var config = {
		//lu
		apiKey: "AIzaSyDbJRXZt4wPpolvFtxw2KBoWhrDRiYubgw",
		authDomain: "sppm1-6f7df.firebaseapp.com",
		databaseURL: "https://sppm1-6f7df.firebaseio.com",
		projectId: "sppm1-6f7df",
		storageBucket: "sppm1-6f7df.appspot.com",
		messagingSenderId: "318196887976"
  };
  firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(function(user) {
	console.log(user.email);
	});
}

function declineInfo(){
	var email = document.getElementById("semail").textContent;
	document.getElementById("emailToRetailer").value = email;
}

function sendEmail(){
	var key = $('#myModal').data('data-id');
	console.log("decline:" + key)
	var db = firebase.database();
	const deleteretailer = db.ref().child("Admin/" + key);
	var seContent = document.getElementById("sendEmailSpan");
	var sendEmail = document.getElementById("sendEmail");
	var Selcetedrow = document.getElementById(key);
		var contents = document.getElementById("emailContent").value;
		//console.log("ModalError");
		if(contents == ""){
			console.log(contents);
			seContent.innerHTML = "Error! Content empty!"
			document.getElementById("emailContent").style.borderColor = "red";
		}else{
			console.log("dfgdfg:" + contents);
			document.getElementById("emailContent").style.borderColor = "";
			seContent.innerHTML = "";
		
			var email = document.getElementById("emailToRetailer").value;
			var emailContents = document.getElementById("emailContent").value;
			Email.send("joshualo9166@gmail.com",
				email,
				"Declination of Samfah Location Based Marketing Registration",
				emailContents,
				"smtp.gmail.com",
				"samfahlbm@gmail.com",
				"samfah123456");

				deleteretailer.remove();
				Selcetedrow.parentNode.removeChild(Selcetedrow);
				$('#myModal').modal('hide');
				document.getElementbyId("emailContent").value = "";
		}	
}



function accept(){
	console.log("a");
}

function count(){
	console.log("1");
}

function Accept()
{
	var password= "";
	var email= "";
	var key = $('#myModal').data('data-id');
	var db = firebase.database();
	const oldRef = db.ref().child("Admin/" + key);
	var OldKey = oldRef.getKey();
	const newRef = db.ref().child("Retailers/" + OldKey);
	var Selcetedrow = document.getElementById(key);
	console.log("Accpet :" + key);
	oldRef.once('value', function(snap)  {
		var info =snap.val();
		password = info.Password;
		email = info.Email;
        newRef.set( snap.val(), function(error) {
			  
			if( !error ) 
			{  
				oldRef.remove(); 
				Selcetedrow.parentNode.removeChild(Selcetedrow);
				console.log("Done Copy and Remove");
				createRetailer(password,email);
				var newRefCharges = db.ref().child("Retailers/" + OldKey +"/Charges");
	   newRefCharges.set( 0, function(error) {
			  
			if( !error ) 
			{  
				console.log("Cahrges added");
			
			}
            else if( typeof(console) !== 'undefined' && console.error ) 
			{  
				console.error(error);
			}
          });
		
			}
            else if( typeof(console) !== 'undefined' && console.error ) 
			{  
				console.error(error);
			}
          });
		
     });	
}

function signout(){
	console.log("ddd");
	console.log("Logout");	
	firebase.auth().signOut().then(function() {
 	localStorage.clear();
	console.log("Sign out Success");
		$.post(window.location.href,{Signout: "yes"}, function(data){
          	window.location = data.redirect;
          });
	}).catch(function(error) {
	});
}