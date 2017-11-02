var check= true;
var proceed= true;

function init()
{
	var config = 
	{		//Josh
			/*apiKey: "AIzaSyBl6ME3cv-NC9IAyti7pVxoKRN2Fa7cAuQ",
			authDomain: "retailer-post.firebaseapp.com",
			databaseURL: "https://retailer-post.firebaseio.com",
			projectId: "retailer-post",
			storageBucketz: "retailer-post.appspot.com",
			messagingSenderId: "784960137513"*/
			
			//Lu
			apiKey: "AIzaSyDbJRXZt4wPpolvFtxw2KBoWhrDRiYubgw",
			authDomain: "sppm1-6f7df.firebaseapp.com",
			databaseURL: "https://sppm1-6f7df.firebaseio.com",
			projectId: "sppm1-6f7df",
			storageBucket: "sppm1-6f7df.appspot.com",
			messagingSenderId: "318196887976"
  };
	firebase.initializeApp(config);
	
	firebase.auth().onAuthStateChanged(function(user) {
	if (user && check) {
		console.log("Sign in user : " + user.uid);
		console.log("Sign in user email : " + user.email);


		/*var validateTypeUser = firebase.database().ref("Admin/Profile");
		

	validateTypeUser.once("value", function(snapshot) {
			
			var checkreturn= snapshot.val();
			console.log(checkreturn.Email);
			if(checkreturn == null)
			{
				console.log("Not ADmin");
			}
			else{
				if(user.email == checkreturn.Email)
				{
					console.log("IS Admin sing in");		
				}
				else{
					console.log("Not ADmin");
				}
			}
			});	 */

	}
	else
	{
		console.log("no user");	
	}

	});
}

/*Validate Email Input*/
function emailBoxValidation(){
	var checkEmail = document.getElementById("emailbox").value;
	var atpos = checkEmail.indexOf("@");
    var dotpos = checkEmail.lastIndexOf(".");
	
	//Check if empty
	if(checkEmail.length!=0){
		if (atpos<1 || dotpos<atpos+2 || dotpos+2>=checkEmail.length){
			document.getElementById("emailbox").style.borderColor = "#f45342";
		}else{
			document.getElementById("emailbox").style.borderColor = "#66afe9";
		}
	}else{
		document.getElementById("emailbox").style.borderColor = "#f45342";
		document.getElementById("emailbox").className += " formInvalid";
		document.getElementById("emailbox").placeholder = "Do not leave this empty";
	}
}

function searchKeyPress(e){
	 // look for window.event in case event isn't passed in
    e = e || window.event;
    if (e.keyCode == 13)
    {
        document.getElementById('loginbtn').click();
        return false;
    }
    return true;
}

function signinBtn(){
	var checkEmail = document.getElementById("Email").value;
	var checkPass = document.getElementById("Password").value;
	var btnSignin = document.getElementById("SignIn");
	
	if(checkEmail!="" && checkPass!=""){
		btnSignin.style.display = "block";
	}else{
		btnSignin.style.display = "none";
	}
}

function signinContainer(){
	var signContainer = document.getElementById("signinDropdown");
	  
		if (signContainer.style.display === 'none') {
			signContainer.style.display = 'block';
		} else {
			signContainer.style.display = 'none';
		}
}
function validate()
{
	var Email = document.getElementById("emailbox").value;
	var Password = document.getElementById("passwordbox").value;
	document.getElementById("signLoader").style.visibility = "visible"
	$.ajax({
		url:window.location.href,
		    data: {Email : Email, Password : Password}, 
		        type: 'POST',
		        success: function(data) {
		        	console.log(data.redirect);
		        	window.location.href = data.redirect;
		        },
		        error: function(xhr, status, error) {
		        	//Return error Email & Password
					var err = JSON.parse(xhr.responseText);
					console.log(err.Error);
					document.getElementById("signLoader").style.visibility = "hidden"
					document.getElementById("signinMessage").textContent = "Hints : " + err.Error;
		        }
	});
	
}


/*Validate Email Input*/
function emailBoxValidation(){
	var checkEmail = document.getElementById("emailbox").value;
	var atpos = checkEmail.indexOf("@");
    var dotpos = checkEmail.lastIndexOf(".");
	
	//Check if empty
	if(checkEmail.length!=0){
		if (atpos<1 || dotpos<atpos+2 || dotpos+2>=checkEmail.length){
			document.getElementById("emailbox").style.borderColor = "#f45342";
		}else{
			document.getElementById("emailbox").style.borderColor = "#66afe9";
		}
	}else{
		document.getElementById("emailbox").style.borderColor = "#f45342";
		document.getElementById("emailbox").className += " formInvalid";
		document.getElementById("emailbox").placeholder = "Do not leave this empty";
	}
}

function searchKeyPress(e){
	 // look for window.event in case event isn't passed in
    e = e || window.event;
    if (e.keyCode == 13)
    {
        document.getElementById('loginbtn').click();
        return false;
    }
    return true;
}


function Logout()
{
	
	console.log("Logout");	
	firebase.auth().signOut().then(function() {
	console.log("Sign out Success");


		$.post(window.location.href + "R_ASig",{Signout: "yes"}, function(data){
          	window.location = data.redirect;
          });
	}).catch(function(error) {
		// An error happened.
		console.log(error);
	});
}



function signinBtn(){
	var checkEmail = document.getElementById("Email").value;
	var checkPass = document.getElementById("Password").value;
	var btnSignin = document.getElementById("SignIn");
	
	if(checkEmail!="" && checkPass!=""){
		btnSignin.style.display = "block";
	}else{
		btnSignin.style.display = "none";
	}
}

function signinContainer(){
	var signContainer = document.getElementById("signinDropdown");
	  
		if (signContainer.style.display === 'none') {
			signContainer.style.display = 'block';
		} else {
			signContainer.style.display = 'none';
		}
}


function Signout()
{
	firebase.auth().signOut().then(function() {
	console.log("Sign out");
	}).catch(function(error) {
		// An error happened.
		console.log(error);
	});
}
 
/*$(document).keypress(function(e){
	var dropdownDiv = document.getElementById("signinDropdown");
	if(dropdownDiv.style.display == "block"){
		if(e.which==13){
			validate();
		}
	}
});
*/




