
function init2()
{	
	var userEmail = document.getElementById("userEmail");
	userEmail.textContent = localStorage.getItem("Email");
	console.log("email = " + localStorage.getItem("Email"))

	var shopName = document.getElementById("shopName");
	shopName.textContent = localStorage.getItem("ShopName");
	
	/*replace comma to @*/
	console.log( localStorage.getItem("ShopLocation"));
	var replaceComma = localStorage.getItem("ShopLocation").replace(/,/g,"@");
	
	var shopLocation = document.getElementById("shopLocation");
	shopLocation.textContent = "@" + replaceComma;
	
	var profilePicture = document.getElementById("profilePicture");
	profilePicture.src = localStorage.getItem("ProfilePic");
	
	var shopCategories = document.getElementById("shop_Category");
	shopCategories.textContent = localStorage.getItem("Category");
	
	/*var greetings = document.getElementById("greetings");
	greetings.textContent = "Welcome Back " +localStorage.getItem("Username")+ "!"*/
		
var config = {
			/*apiKey: "AIzaSyBl6ME3cv-NC9IAyti7pVxoKRN2Fa7cAuQ",
			authDomain: "retailer-post.firebaseapp.com",
			databaseURL: "https://retailer-post.firebaseio.com",
			projectId: "retailer-post",
			storageBucketz: "retailer-post.appspot.com",
			messagingSenderId: "784960137513"*/
	apiKey: "AIzaSyDbJRXZt4wPpolvFtxw2KBoWhrDRiYubgw",
    authDomain: "sppm1-6f7df.firebaseapp.com",
    databaseURL: "https://sppm1-6f7df.firebaseio.com",
    projectId: "sppm1-6f7df",
    storageBucket: "sppm1-6f7df.appspot.com",
    messagingSenderId: "318196887976"
  };
  firebase.initializeApp(config);
 firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("Sign in user : " + user.uid);
	 console.log("Sign in user : " + user.email);
	 
					var getJSON = function(url) {
					return new Promise(function(resolve, reject) {
					var xhr = new XMLHttpRequest();
					
					xhr.open('get', url, true);
					xhr.responseType = 'json';
					xhr.onload = function() {
					  var status = xhr.status;
					  if (status == 200) {
						resolve(xhr.response);
					  } else {
						reject(status);
					  }
					};
					xhr.send();
				  });
				};

				getJSON('https://sppm1-6f7df.firebaseio.com/Retailers.json?&orderBy="Email"&equalTo="'+user.email+'"&print=pretty').then(function(data) {
					console.log('Your Json result is:  ' + data); //you can comment this, i used it to debug
					console.log(data);
											
							for(var key in data)
							{
								if(data.hasOwnProperty(key))
								{
									//var changeName = document.getElementById("retailerName");
									//changeName.textContent = data[key].Full_name;
									//console.log(data[key].Username);
								}
							}
					
				}, function(status) { //error detection....
				  alert('Something went wrong.');
				});
				  } else {
					// No user is signed in.
					 console.log("No User");
				  }
				});
}
function test()
{
	 firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("Sign in user : " + user.uid);
	 console.log("Sign in user : " + user.email);

  } else {
    // No user is signed in.
	 console.log("No User");
  }
});
}

function signout(){
	firebase.auth().signOut();
	window.location.href="signIn.html";
}

	
	
	
	
	  
