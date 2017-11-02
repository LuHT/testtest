function init()
{
		var config = {
			//Josh
			/*apiKey: "AIzaSyBl6ME3cv-NC9IAyti7pVxoKRN2Fa7cAuQ",
			authDomain: "retailer-post.firebaseapp.com",
			databaseURL: "https://retailer-post.firebaseio.com",
			projectId: "retailer-post",
			storageBucket: "retailer-post.appspot.com",
			messagingSenderId: "784960137513"*/
			
			//lu
			apiKey: "AIzaSyDbJRXZt4wPpolvFtxw2KBoWhrDRiYubgw",
			authDomain: "sppm1-6f7df.firebaseapp.com",
			databaseURL: "https://sppm1-6f7df.firebaseio.com",
			projectId: "sppm1-6f7df",
			storageBucket: "sppm1-6f7df.appspot.com",
			messagingSenderId: "318196887976"
  };
  
  //Initialize firebase database
  firebase.initializeApp(config);
  //check and disable confirmPassword
  var confirmPassword = document.getElementById("confirmPassword");
  if(confirmPassword.value !="")
  {
  	confirmPassword.disabled = false;
  }
}


//onblur Email
function validateEmail()
{
	var Email = document.getElementById("email");
	var EmailError = document.getElementById("emailText");

	if(Email.value != "")
	{
		console.log("ssss");
		Email.style.borderColor = "#66afe9";
		Email.placeholder = "";
		EmailError.style.color = "#f45342";
		EmailError.textContent = "";
		return true;
	}
	else
	{
		Email.style.borderColor = "#f45342";
		Email.className += " formInvalid";
		Email.placeholder = "Email Address";
		EmailError.style.color = "#f45342";
		EmailError.textContent = "Email Address is required";
		return false;
	}
	
}


function validateProfileName()
{
	var ProfileName = document.getElementById("ProfileName");
	var ProfileNameError = document.getElementById("ProfileNameText");

	if(ProfileName.value != "")
	{
		console.log("ssss");
		ProfileName.style.borderColor = "#66afe9";
		ProfileName.placeholder = "";
		ProfileNameError.style.color = "#f45342";
		ProfileNameError.textContent = "";
		return true;
	}
	else
	{
		ProfileName.style.borderColor = "#f45342";
		ProfileName.className += " formInvalid";
		ProfileName.placeholder = "Email Address";
		ProfileNameError.style.color = "#f45342";
		ProfileNameError.textContent = "Profile Name is required";
		return false;
	}
}
//onfocus Email
function OnfocusEmail()
{
	var Email = document.getElementById("email");
	var EmailError = document.getElementById("emailText");
	Email.style.borderColor = "#66afe9";
	Email.placeholder = "";
	EmailError.style.color = "#f45342";
	EmailError.textContent = "";
	return true;
}

//onkey Password
var checkingPassword = false;
function validatePassword(){
		var password = document.getElementById("password").value;
		
		if(password.length<6){
			document.getElementById("password").style.borderColor = "#f45342";
			document.getElementById("password").className += " formInvalid";
			document.getElementById("passwordText").innerHTML = "Must contain more than 6 keys!";
			document.getElementById("passwordText").style.color = "#f45342";
			checkingPassword = false;
		}else{
			checkingPassword = true;
			document.getElementById("password").style.borderColor = "#66afe9";
			document.getElementById("passwordText").innerHTML = "";
			
			var score = 0;
								//Try other score calculation
								// award every unique letter until 5 repetitions
								var letters = new Object();
								for (var i=0; i<password.length; i++) {
									letters[password[i]] = (letters[password[i]] || 0) + 1;
									score += 5.0 / letters[password[i]];
								}

								// bonus points for mixing it up
								var variations = {
									digits: /\d/.test(password),
									lower: /[a-z]/.test(password),
								}
								variationCount = 0;
								for (var check in variations) {
									variationCount += (variations[check] == true) ? 1 : 0;
								}
								score += (variationCount - 1) * 10;
								
	
			if(score > 10){
				document.getElementById("password").style.borderColor = "#b2b2b2";
				document.getElementById("passwordText").innerHTML = "weak";
				document.getElementById("passwordText").style.color = "#b2b2b2";
			}if(score > 60){
				document.getElementById("password").style.borderColor = "#b6ef88";
				document.getElementById("passwordText").innerHTML = "good";
				document.getElementById("passwordText").style.color = "#b6ef88";
			}if(score > 80){
				document.getElementById("password").style.borderColor = "#51af05";
				document.getElementById("passwordText").innerHTML = "Strong";
				document.getElementById("passwordText").style.color = "#51af05";
			}		
	
		}
		
		var confirmInput = document.getElementById("confirmPassword");
		var ConfirmPasswordError = document.getElementById("confirmPasswordText");
		if(checkingPassword){
			confirmInput.disabled = false;
			return true;
		}else{
			confirmInput.disabled = true;
			confirmInput.value ="";
			ConfirmPasswordError.textContent ="";
			confirmInput.style.borderColor = "#66afe9";
			confirmInput.placeholder = "";
			return false;
		}
}

//onblur password
function onblurPassword()
{
	var Password = document.getElementById("password");
	var PasswordError = document.getElementById("passwordText");
	if(Password.value == "")
	{
		Password.style.borderColor = "#f45342";
		Password.className += " formInvalid";
		Password.placeholder = "Password";
		PasswordError.style.color = "#f45342";
		PasswordError.textContent = "Password is required";
		return true;
	}
}
//onfocus Password
function OnfocusPassword()
{
	var Password = document.getElementById("password");
	var PasswordError = document.getElementById("passwordText");
	Password.style.borderColor = "#66afe9";
	Password.placeholder = "";
	PasswordError.style.color = "#f45342";
	PasswordError.textContent = "";
	return true;
}
//onchange ConfirmPassword
function onchangeconfirmPassword(){
	var getfrompass = document.getElementById("password").value;
	var confirmInput = document.getElementById("confirmPassword").value;
	
		if(getfrompass == confirmInput){
			document.getElementById("confirmPasswordText").innerHTML = "";
			document.getElementById("confirmPassword").style.borderColor = "#66afe9";
			if(getfrompass =="" && confirmInput=="")
			{
				return false;
			}
			else
			{
				document.getElementById("confirmPasswordText").innerHTML = "";
				document.getElementById("confirmPassword").style.borderColor = "#66afe9";
				return true;
			}
			
		}else{
			
			document.getElementById("confirmPassword").style.borderColor = "#f45342";
			document.getElementById("confirmPassword").className += " formInvalid";
			document.getElementById("confirmPasswordText").innerHTML = "These passwords don't match. Try again?";
			document.getElementById("confirmPasswordText").style.color = "#f45342";
			return false;
		}
}
//onfocus confirmPassword
function onfocusconfirmPassword()
{
	var ConfirmPassword = document.getElementById("confirmPassword");
	var ConfirmPasswordError = document.getElementById("confirmPasswordText");
	ConfirmPassword.style.borderColor = "#66afe9";
	ConfirmPassword.placeholder = "";
	ConfirmPasswordError.style.color = "#f45342";
	ConfirmPasswordError.textContent = "";
	return true;
}
//onfocus PhoneNumber
function onfocusPhoneNumber()
{
	var PhonenumberError = document.getElementById("phoneNumberText");
	var Phonenumber = document.getElementById("phonenumber");
	Phonenumber.style.borderColor = "#66afe9";
	Phonenumber.placeholder = "";
	PhonenumberError.style.color = "#f45342";
	PhonenumberError.textContent = "";
	return true;
}
//Phone Number only
function validatePhone(e){
		var phone = document.getElementById("phonenumber").value;
		
	var word = e;
	if((word.charCode >= 48 && word.charCode <= 57)){ // 0-9
		return true;
	}else{
		return false;
	}
}
//Onkey Phone Number 
function validatePhonelength()
{
	var checkphone = false;
	var phone = document.getElementById("phonenumber").value;
	if (phone.length == 10)
	{
		checkphone = true;
		document.getElementById("phonenumber").style.borderColor = "#66afe9";
		document.getElementById("phoneNumberText").innerHTML = "";
	}
	else
	{
		if(phone.length < 10 && phone.length >0)
		{
			document.getElementById("phonenumber").style.borderColor = "#f45342";
			document.getElementById("phonenumber").className += " formInvalid";
			document.getElementById("phoneNumberText").innerHTML = "At least 10 Number";
			document.getElementById("phoneNumberText").style.color = "#f45342";
			checkphone = false;
		}
		else
		{
			document.getElementById("phonenumber").style.borderColor = "#f45342";
			document.getElementById("phoneNumberText").innerHTML = "Phone Nmuber is required";
			document.getElementById("phoneNumberText").style.color = "#f45342";
			checkphone = true;
		}
		
	}
	return checkphone;
}
//onchange Category
function validateCategory()
{
	var category = document.getElementById("category");
	var selectedCategory = category.options[category.selectedIndex].text;
	var selectedCategoryC = category.options[category.selectedIndex].style.color;
	if(selectedCategory != "Select category")
	{
	
		document.getElementById("category").style.borderColor = "#66afe9";
		document.getElementById("categoryText").innerHTML = "";
		document.getElementById("SelectC").style.color = "#000000";
			return true;
	}
	else{
	
		document.getElementById("category").style.borderColor = "#f45342";
		
		selectedCategoryC = "#f45342";
		console.log("selectedCategory: " + selectedCategory);
		console.log("selectedCategory: " + selectedCategoryC);
			document.getElementById("SelectC").style.color = "#f45342";
		document.getElementById("categoryText").innerHTML = "Select Category of the Shop";
		document.getElementById("categoryText").style.color = "#f45342";
			return false;
	}
}


$('#Register-form').submit(function(e) {
	console.log("sss");
    e.preventDefault();
    	var Return =true;
	//Getting All input text object
	var Email = document.getElementById("email");
	var Password = document.getElementById("password");
	var ConfirmPassword = document.getElementById("confirmPassword");
	var Phonenumber = document.getElementById("phonenumber");
	var Category = document.getElementById("category");
	var LocationTable =document.getElementById("results");
	var Locations =document.getElementById("locations"); 
	var ProfileName = document.getElementById("ProfileName");

	console.log(LocationTable.rows.length);
	console.log(LocationTable);

	    //gets rows of table
    var rowLength = LocationTable.rows.length;

    //loops through rows    
    for (i = 0; i < rowLength; i++){

      //gets cells of current row  
       var oCells = LocationTable.rows.item(i).cells;

       //gets amount of cells of current row
       var cellLength = oCells.length;

            var cellVal = oCells.item(1).innerHTML;
            console.log(cellVal);
        
    }
	var EmailError = document.getElementById("emailText");
	var PasswordError = document.getElementById("passwordText");
	var ConfirmPasswordError = document.getElementById("confirmPasswordText");
	var PhonenumberError = document.getElementById("phoneNumberText");
	var CategoryError = document.getElementById("categoryText");
	var LocationsError =document.getElementById("loctionserror"); 
	var ProfileNameError = document.getElementById("ProfileNameText");

	//Check Empty Input
	if(Email.value == "")
	{
		Email.style.borderColor = "#f45342";
		Email.className += " formInvalid";
		Email.placeholder = "Email Address";
		EmailError.style.color = "#f45342";
		EmailError.textContent = "Email Address is required";
		Return = false;
	}
	if(Password.value == "")
	{
		Password.style.borderColor = "#f45342";
		Password.className += " formInvalid";
		Password.placeholder = "Password";
		PasswordError.style.color = "#f45342";
		PasswordError.textContent = "Password is required";
		Return = false;
	}
	else{
		if(ConfirmPassword.value != "")
		{
			if(ConfirmPassword.value.length != Password.value.length)
			{
				ConfirmPassword.style.borderColor = "#f45342";
				ConfirmPassword.className += " formInvalid";
				ConfirmPassword.placeholder = "Confirm Password";
				ConfirmPasswordError.style.color = "#f45342";
				ConfirmPasswordError.textContent = "These passwords don't match. Try again?";
				Return = false;
			}
		}
		else{
			if(Password.value != "")
			{
				ConfirmPassword.style.borderColor = "#f45342";
				ConfirmPassword.className += " formInvalid";
				ConfirmPassword.placeholder = "Confirm Password";
				ConfirmPasswordError.style.color = "#f45342";
				ConfirmPasswordError.textContent = "Confirm Password is required";
				Return = false;
			}
			
		}
		
	}
	if(Phonenumber.value == "")
	{
		Phonenumber.style.borderColor = "#f45342";
		Phonenumber.className += " formInvalid";
		Phonenumber.placeholder = "Phone Number";
		PhonenumberError.style.color = "#f45342";
		PhonenumberError.textContent = "Phone Nmuber is required";
		Return = false;
	}
	if(category.options[category.selectedIndex].text =="Select category")
	{
			category.style.borderColor = "#f45342";
			category.className += " formInvalid";
			CategoryError.style.color = "#f45342";
			CategoryError.textContent = "Select Category";
			Return = false;
	}
	if(LocationTable.rows.length == 0)
	{
		Locations.style.borderColor = "#f45342";
		Locations.className += " formInvalid";
		LocationsError.style.color = "#f45342";
		LocationsError.textContent = "Select at least one location";
		Return = false;
	}
	if(ProfileName.value == "")
	{
		ProfileName.style.borderColor = "#f45342";
		ProfileName.className += " formInvalid";
		ProfileNameError.style.color = "#f45342";
		ProfileNameError.textContent = "Select at least one location";
		Return = false;
	}
	


	if(Return)
	{
		var checkdd = $(this).serialize();
		var h = checkdd.split("&");
	var formData = JSON.stringify($(this).serializeArray());
	//console.log(formData);
		console.log(checkdd);
		console.log(h);
		var a = JSON.stringify(storage_Location);
		console.log('Coordinates string: ', a)
 //$(this).serialize()+ '&downloadURL=' + encodeURI(downloadURL) + '&Location=' + storage_Name +'&LatLng='+storage_LatLng
		var parsed = JSON.parse(a)
		console.log('Parsed Coordinates: ', parsed)
		if(document.getElementById("profilepic").files.length==0){
			console.log("No file");
			var downloadURL = "https://firebasestorage.googleapis.com/v0/b/sppm1-6f7df.appspot.com/o/default_profile_pic%2Fblank_profile.png?alt=media&token=4207c532-2bb2-4322-ab0d-7d8a234b2cf4"
			var UserInfo = {
				downloadURL : downloadURL,
				Location : storage_Name.toString(),
				City : storage_City.toString(),
				LatLng : storage_LatLng.toString()
			};

			$.ajax({
		        url: $(this).attr('action'),
		        data: $(this).serialize() + '&' + $.param(UserInfo), 
		        type: 'POST',
		        success: function(data) {
		        	//Posting Success 
		        	console.log(data.redirect);
		        	$('#myModalSuccess').modal({backdrop: 'static', keyboard: false});
					var modalContent = document.getElementById("alertMsgSuccess");
					modalContent.innerHTML += "Request being sent to Admin. Please check email within this few days for verification.";			
					var setFooter = document.getElementById("modalSuccessFooter");
					setFooter.innerHTML += '<button class="btn btn-success pull-right" id="btnOK"> OK </button>';
					$("#btnOK").click(function(){
						window.location.href = data.redirect;
					});
		        },
	      		error: function(xhr, status, error) {
	 			var err = JSON.parse(xhr.responseText);
	 			var EmailError = document.getElementById("emailText");
	 			 //Getting All Error Display object 
				var PasswordError = document.getElementById("passwordText");
				var ConfirmPasswordError = document.getElementById("confirmPasswordText");
				var PhonenumberError = document.getElementById("phoneNumberText");
				var CategoryError = document.getElementById("categoryText");
	 			 for(var f in err.Error)
	 			 {
	 			 	if(err.Error[f] =="That Email is Register. Try another.")
	 			 	{
	 			 		EmailError.style.color = "#f45342";
						EmailError.textContent = err.Error[f];
	 			 	}
	 			 	if(err.Error[f] == "Invalid email address")
	 			 	{
	 			 		EmailError.style.color = "#f45342";
						EmailError.textContent = err.Error[f];
	 			 	}
	 			 	if(err.Error[f] == "Must contain more than 6 keys!")
	 			 	{
	 			 		PasswordError.style.color = "#f45342";
						PasswordError.textContent = err.Error[f];
	 			 	}
	 			 	if(err.Error[f] == "These passwords don't match. Try again?")
	 			 	{
	 			 		ConfirmPasswordError.style.color = "#f45342";
						ConfirmPasswordError.textContent = err.Error[f];
	 			 	}
	 			 	if(err.Error[f] == "Invalid Phone Number")
	 			 	{
	 			 		PhonenumberError.style.color = "#f45342";
						PhonenumberError.textContent = err.Error[f];
	 			 	}
	 			 	if(err.Error[f] == "Invalid Category")
	 			 	{
	 			 		CategoryError.style.color = "#f45342";
						CategoryError.textContent = err.Error[f];
	 			 	}	
	 			 }
			}
	   		});
		}
		else
		{
		//upload file 
		var imageFile = document.getElementById("profilepic").files[0];
		var profilePicStore = firebase.storage().ref("retailer_profile/"+Email.value+"/" +imageFile.name).put(imageFile);
		profilePicStore.on('state_changed', function(snapshot){
		var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		console.log('Upload is ' + progress + '% done');
		switch (snapshot.state) {
			case firebase.storage.TaskState.PAUSED: // or 'paused'
				console.log('Upload is paused');
				break;
			case firebase.storage.TaskState.RUNNING: // or 'running'
				console.log('Upload is running');
				break;
		}
		}, function(error) {
		  // Handle unsuccessful uploads
		}, function() {
			  // Handle successful uploads on complete
			  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
			  var downloadURL = profilePicStore.snapshot.downloadURL;
			  console.log("Upload Successful");
			   //POST
			var UserInfo = {
				downloadURL : downloadURL,
				Location : storage_Name.toString(),
				City : storage_City.toString(),
				LatLng : storage_LatLng.toString()
			};

			$.ajax({
		        url: $(this).attr('action'),
		        data: $(this).serialize() + '&' + $.param(UserInfo), 
		        type: 'POST',
		        success: function(data) {
		        //Posting Success 
		        	console.log(data.redirect);
		        	$('#myModalSuccess').modal({backdrop: 'static', keyboard: false});
					var modalContent = document.getElementById("alertMsgSuccess");
					modalContent.innerHTML += "Request being sent to Admin. Please check email within this few days for verification.";			
					var setFooter = document.getElementById("modalSuccessFooter");
					setFooter.innerHTML += '<button class="btn btn-success pull-right" id="btnOK"> OK </button>';
					$("#btnOK").click(function(){
						window.location.href = data.redirect;
					});
		        },
	      		error: function(xhr, status, error) {
	 			var err = JSON.parse(xhr.responseText);
	 			var EmailError = document.getElementById("emailText");
	 			 //Getting All Error Display object 
				var PasswordError = document.getElementById("passwordText");
				var ConfirmPasswordError = document.getElementById("confirmPasswordText");
				var PhonenumberError = document.getElementById("phoneNumberText");
				var CategoryError = document.getElementById("categoryText");

	 			 for(var f in err.Error)
	 			 {
	 			 	if(err.Error[f] =="That Email is Register. Try another.")
	 			 	{
	 			 		EmailError.style.color = "#f45342";
						EmailError.textContent = err.Error[f];
						// Create a reference to the file to delete
						var desertRef = firebase.storage().ref("retailer_profile/"+Email.value+"/" +imageFile.name);
						// Delete the file
						desertRef.delete().then(function() {
 				 		console.log("Done Delete");
						}).catch(function(error) {
 						 // Uh-oh, an error occurred!
						});
	 			 	}
	 			 	if(err.Error[f] == "Invalid email address")
	 			 	{
	 			 		EmailError.style.color = "#f45342";
						EmailError.textContent = err.Error[f];
	 			 	}
	 			 	if(err.Error[f] == "Must contain more than 6 keys!")
	 			 	{
	 			 		PasswordError.style.color = "#f45342";
						PasswordError.textContent = err.Error[f];
	 			 	}
	 			 	if(err.Error[f] == "These passwords don't match. Try again?")
	 			 	{
	 			 		ConfirmPasswordError.style.color = "#f45342";
						ConfirmPasswordError.textContent = err.Error[f];
	 			 	}
	 			 	if(err.Error[f] == "Invalid Phone Number")
	 			 	{
	 			 		PhonenumberError.style.color = "#f45342";
						PhonenumberError.textContent = err.Error[f];
	 			 	}
	 			 	if(err.Error[f] == "Invalid Category")
	 			 	{
	 			 		CategoryError.style.color = "#f45342";
						CategoryError.textContent = err.Error[f];
	 			 	}	
	 			 }
			}
	   		});


		});


		}

	}
});
//Global variable using for googleMap
var place;
var markers = [];
var MARKER_PATH = 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi_hdpi.png';
var tablerow=0;
var currentmarker;
var storage_Location =[];
var storage_LatLng = [];
var storage_Name = [];
var storage_City = [];
//init maps
function initMaps() {
	   getLocation();  
}
//Get current location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(initmap);
		
    } else {
    
    }	
}
//Get Start init google Map
function initmap(position) {
	 console.log("Google Map Ready");
    latt = position.coords.latitude; 
	Long = position.coords.longitude; 
	CurrentLocation = {lat: latt, lng: Long};
	CurrentLocation = {lat: 1.534756, lng: 110.356970};
        map = new google.maps.Map(document.getElementById('mapss'), {
          zoom: 10,
          center: CurrentLocation
        }); 
        //setup the autocomplete
		locations = document.getElementById('locations');
	   var options = {
		types: ['establishment'],
		componentRestrictions: {country: 'MY'}
		};
		 autocomplete = new google.maps.places.Autocomplete(
			locations, {
			    componentRestrictions: {country: 'MY'}
             
            });
			  infoWindow = new google.maps.InfoWindow({
          content: document.getElementById('info-content')
        });
		//For Text Search
		places = new google.maps.places.PlacesService(map);
		
		//Add Listener to autocomplete text
        autocomplete.addListener('place_changed', onPlaceChanged);
}
//listener of the autocomplete
function onPlaceChanged()
{
		var place = autocomplete.getPlace();
		var f =document.getElementById('locations').value;
        if (place.geometry) {
          map.panTo(place.geometry.location);
          map.setZoom(17);
		  locations.value = "";
		  	var address = place.address_components;
			var city = address[address.length -5].long_name;
			
			storage_City.push(city);
			console.log(storage_City);
          search(f);
        } else {
         // document.getElementById('autocomplete').placeholder = 'Enter a city';
        }
		
}
//text search
 function search(f) {

        var search = {
          bounds: map.getBounds(),
          query : f,
        };
		places = new google.maps.places.PlacesService(map);
        places.textSearch(search, function(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            // Create a marker for each search
			var i = 0;
			//check address
			console.log(results[i].formatted_address);
			console.log(results[i].name);
			console.log(results[i].geometry.location.lat());
			console.log(results[i].geometry.location.lng());
			}
			//check previous
			if(storage_Location.length > 0)
			{
				for(var x = 0 ;x <= storage_Location.length-1 ; x++)
				{
					if(storage_Location[x] ==results[0].formatted_address)
					{
						console.log("eee");
						console.log("errir ");
						$('#myModal').modal('toggle');
						var messageTitle = document.getElementById("modalTitle");
						messageTitle.innerHTML = "Warning"
						
						var message = document.getElementById("alertMsg");
						message.innerHTML = "You Have Already Selected the Shop name Locaiton!";
						
						return;
					}
				}
			}
			
				// Use marker animation to drop the icons incrementally on the map.
				var markerz = new google.maps.Marker({
		 	  	position: results[i].geometry.location,
		  	 	animation: google.maps.Animation.DROP,
				});
						
				markers.push(markerz);
				// If the user clicks a shop marker, show the details of that shop
				// in an info window.
				google.maps.event.addListener(markerz, 'click', showInfoWindow);
				google.maps.event.addListener(infoWindow, 'closeclick', closeInfoWindow);
				markerz.placeResult = results[i];
				setTimeout(dropMarker(markers.length -1), i * 100);
				addContent(results[i],markers.length -1);
				storage_Location.push(results[i].formatted_address);
				//storage_Location.push(results[i].address_components.types[0];);
				storage_LatLng.push(results[i].geometry.location.lat() + "/" + results[i].geometry.location.lng());
				storage_Name.push(results[i].name);

				console.log("sss");
				console.log(storage_Location);			
});
}
// Get the place details for a search. Show the information in an info window,
// anchored on the marker  for the search that the user selected.
function showInfoWindow() { 
    currentmarker = this;
    places.getDetails({placeId: currentmarker.placeResult.place_id},
        function(place, status) {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
                return;
              }
				infoWindow.open(map, currentmarker);
				buildIWContent(place);
            });
}
//show the InfoWindow
function buildIWContent(place) {
	
    document.getElementById('Shop-url').innerHTML = '<b><a target="_blank" href="' + place.url +
    '">' + place.name + '</a></b>';		
	document.getElementById('shop_icon').innerHTML = '<img class="shopIcon" ' +
     'src="' + place.icon + '"/>';
}

//show the close InfoWindow
function closeInfoWindow(){
	var isd = currentmarker.placeResult.name;
	var results = document.getElementById('results');
	var id = currentmarker.placeResult.place_id;
	console.log("ddd");
	for(var  i=0  ; i <= markers.length-1 ; i++)
	{
		if(markers[i].placeResult.place_id == id)
		{
			markers.splice(i, 1);	
			storage_Location.splice(i, 1);
			storage_LatLng.splice(i, 1);
			storage_Name.splice(i,1);
			storage_City.splice(i,1);
		}
	}
	for(var x = 0 ; x <= results.rows.length-1 ; x++)
	{ 	
		if(id == results.rows[x].cells[1].id)
		{
			console.log(results.rows[x].cells[1].id);
			results.deleteRow(x);
		}
			
	}
	tablerow--;

	currentmarker.setMap(null); 
}	
function dropMarker(i) {
    return function() {
    markers[i].setMap(map);
	tablerow++;
    };
	
}
function addContent(result, i) {
        var results = document.getElementById('results');
       // var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
        var markerIcon = MARKER_PATH;
		var thisMarker = markers[i];
        var tr = document.createElement('tr');
        tr.style.backgroundColor = (i % 2 === 0 ? '#F0F0F0' : '#FFFFFF');
        tr.onclick = function() {
		for(var x = 0 ; x <= results.rows.length-1 ; x++)
		{ 	
			results.rows[x].style.backgroundColor = (x % 2 === 0 ? '#F0F0F0' : '#FFFFFF');
			
		}
			this.style.backgroundColor='#BCD4EC';
		google.maps.event.trigger(thisMarker, 'click');
        };
        var iconTd = document.createElement('td');
        var nameTd = document.createElement('td');
	
		 nameTd.id =result.place_id;
        var icon = document.createElement('img');
        icon.src = markerIcon;
        icon.setAttribute('class', 'placeIcon');
        icon.setAttribute('className', 'placeIcon');
        var name = document.createTextNode(result.name);
        iconTd.appendChild(icon);
        nameTd.appendChild(name);
        tr.appendChild(iconTd);
        tr.appendChild(nameTd);
        results.appendChild(tr);
		
      }
//Disable Enter key as submit form 
$('#Register-form').on('keypress', function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) { 
    e.preventDefault();
    return false;
  }
});