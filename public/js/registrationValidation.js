//Username
/*function checkUsername(){
	var checklength = document.getElementById("username").value;
	if(checklength.length!= 0){
		
		if(checklength.length <6 )
		{
			document.getElementById("username").style.borderColor = "#f45342";
			document.getElementById("unameText").innerHTML = "Must "
		}
		else
		{
			document.getElementById("username").style.borderColor = "#66afe9";
		}
		
	}else{
		document.getElementById("username").style.borderColor = "#f45342";
		document.getElementById('username').className += " 	formInvalid";
		document.getElementById("username").placeholder = "Userame - Do not leave this empty";
	}
}

function noSymbol(e){
		var word = e;
		if((word.charCode >= 48 && word.charCode <= 57) || // 0-9
            (word.charCode >= 97 && word.charCode <= 122))
			{
				return true;
			}else {
			return false;
		}
}*/

//Full Name
/*function checkFullname(){
	var checklength = document.getElementById("fullname").value;
	if(checklength.length!= 0){
		
		if(checklength.length <3 )
		{
			document.getElementById("fullname").style.borderColor = "#f45342";
		}
		else
		{
			document.getElementById("fullname").style.borderColor = "#66afe9";
		}
		
	}else{
		document.getElementById("fullname").style.borderColor = "#f45342";
		document.getElementById('fullname').className += " formInvalid";
		document.getElementById("fullname").placeholder = "Fullname";
		document.getElementById("fnameText").innerHTML = "Do not leave this empty";
	}
}

function noSymbol2(e){
		var word = e;
		if((word.charCode >= 65 && word.charCode <= 90) || // A-Z
            (word.charCode >= 97 && word.charCode <= 122)||
			(word.charCode == 32))
			{
				return true;
			}else {
			return false;
		}
}*/

//Email
/*function validateEmail(){
	var checkEmail = document.getElementById("email").value;
	var atpos = checkEmail.indexOf("@");
    var dotpos = checkEmail.lastIndexOf(".");
	
	//Check if empty
	if(checkEmail.length!=0){
		if (atpos<1 || dotpos<atpos+2 || dotpos+2>=checkEmail.length){
			document.getElementById("email").style.borderColor = "#f45342";
			document.getElementById("emailText").innerHTML = "";
		}else{
			document.getElementById("email").style.borderColor = "#66afe9";
			document.getElementById("emailText").innerHTML = "";
		}
	}else{
		document.getElementById("email").style.borderColor = "#f45342";
		document.getElementById("email").className += " formInvalid";
		document.getElementById("email").placeholder = "Email Address";
		document.getElementById("emailText").innerHTML = "Do not leave this empty";
	}
}

//Password
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
		if(checkingPassword){
			confirmInput.disabled = false;
		}else{
			confirmInput.disabled = true;
		}
}

function confirmPassword(){
	var getfrompass = document.getElementById("password").value;
	var confirmInput = document.getElementById("confirmPassword").value;
	
		if(getfrompass == confirmInput){
			document.getElementById("confirmPasswordText").innerHTML = "";
			document.getElementById("confirmPassword").style.borderColor = "#66afe9";
		}else{
			document.getElementById("confirmPassword").style.borderColor = "#f45342";
			document.getElementById("confirmPassword").className += " formInvalid";
			document.getElementById("confirmPasswordText").innerHTML = "Password does not match";
			document.getElementById("confirmPasswordText").style.color = "#f45342";
		}
	
}

//Phone Number only
function validatePhone(e){
	var word = e;
	if((word.charCode >= 48 && word.charCode <= 57)){ // 0-9
		return true;
	}else{
		return false;
	}
}

function readURL(input){
	if(input.files && input.files[0]){
		var reader = new FileReader();
		
		reader.onload = function(e){
			$('#imgPreview')
				.attr('src', e.target.result)
		};
		reader.readAsDataURL(input.files[0]);
	}
}*/







