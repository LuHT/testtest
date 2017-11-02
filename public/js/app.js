
function checkBeforeSubmit(){
  var proceed = true;

  var price = document.getElementById("oriPrice").value;
  var discount = document.getElementById("textInput").value;
  var expirydate = document.getElementById("date").value;
  var discountRate = document.getElementById("textInput").value;
  var discountRangeFrom = document.getElementById("discountRateFrom").value;
  var discountRangeTo = document.getElementById("discountRateTo").value;
  var locations = document.getElementById("selected").value.split(",");
  var description = document.getElementById("description").value;
  if(price==""){
    document.getElementById("oriPrice").style.borderColor = "#f45342";
    document.getElementById("oriPrice").placeholder = "Price - Do not leave this empty";
  }
  
  if(discount==""){
    document.getElementById("textInput").style.borderColor = "#f45342";
    document.getElementById("textInput").placeholder = "Discount Rate - Do not leave this empty";
  }
  
  if(expirydate==""){
    document.getElementById("date").style.borderColor = "#f45342";
  }
  
  if(discountRate>100){
    document.getElementById("textInput").style.borderColor = "#f45342";
    document.getElementById("rateValidText").textContent = "Discount Rate Cannot be more than 100%!";
  }else{
    document.getElementById("rateValidText").textContent = "";
  }
  
  if(discountRangeFrom >100){
    document.getElementById("discountRateFrom").style.borderColor = "#f45342";
    document.getElementById("rangeFromText").textContent = "Discount Range Cannot be more than 100%!";
  }else{
    document.getElementById("rangeFromText").textContent = "";
  }
  
  if(discountRangeTo > 100){
    document.getElementById("discountRateTo").style.borderColor = "#f45342";
    document.getElementById("rangeToText").textContent = "Discount Range Cannot be more than 100%!";
  }else{
    document.getElementById("rangeToText").textContent = "";
  }
  if(discountRangeTo != "" )
  {
    if(discountRangeFrom > discountRangeTo){
      document.getElementById("rangeFromText").textContent = "Cannot be more than Discount To";
      document.getElementById("rangeToText").textContent = "Cannot be less than Discount From";
      
      document.getElementById("discountRateFrom").style.borderColor = "#f45342";
      document.getElementById("discountRateTo").style.borderColor = "#f45342";
    }else{
      document.getElementById("rangeFromText").textContent = "";
      document.getElementById("rangeToText").textContent = "";
    }
    
    
  }
  var msg = "";
  var dropdownDiscountRate = document.getElementById("discountRateList");
  var dropdownOriPrice = document.getElementById("oriPirceList");
  var dropdownDiscountRange = document.getElementById("discountRangeList");
  var dropdownAdPic = document.getElementById("adPicList");
  var dropdownSpecification = document.getElementById("adSpecification");
  
  if( expirydate=="" || locations.includes("")){
    msg +="Error occured, please make sure all the inputs are correct!";
    proceed = false;
  
  }else{
    if(dropdownOriPrice.style.display == "none" )
    {
      if(price=="")
      {
        msg +="price cant be empty!\n";
        proceed = false;
      }
      else{
        if(dropdownDiscountRate.style.display == "none" && price!="")
        {
          if(discountRate =="")
          {
            msg +="Discount rate cant be empty\n";
            proceed = false;
          }
          else{
            if(discountRate> 100)
            {
              msg +="Discount rate cant more than 100!\n";
              proceed = false;
            }
            else{
              proceed = true;
            }
          }
          
        }
      } 
    }
    
    if(dropdownDiscountRange.style.display == "none")
      {
        console.log("sss");
        if(discountRangeFrom == "" &&  discountRangeTo == "")
        {
            proceed = false;
            msg +="Cant leave empty\n";
        }
        else
        {
          if(discountRangeFrom > 100 || discountRangeTo > 100 )
          {
            proceed = false;
            msg +="Discount rate cant more than 100!\n";
          }
          else
          {
            if(discountRangeFrom>discountRangeTo)
            {
              if(discountRangeTo==""){
                proceed = true;
              }else{
                proceed = false;
                msg +="From cant larger than To!\n";
              }
            }
            else
            {
              if(discountRangeFrom==discountRangeTo)
              {
                proceed = false;
                msg +="cant be same!\n";
              }
              else
              {
                proceed = true;
              }
            }
          }
        }
      }
      
      
      if(dropdownAdPic.style.display == "none")
      {
        
        if(document.getElementById("advpic").files.length==0)
        {
          //proceed = false;
          msg +="no image\n";
          
        }
        else
        {
            proceed = true;
        }
        
      }
      
      if(dropdownSpecification.style.display == "none"){
        if(document.getElementById("specificationTextArea").value==""){
          proceed=false;
          msg +="Specification appears to be blank.\n";
        }
      }
      
      if(description == "")
      {
        if(document.getElementById("description").value=="")
        {
          proceed = false;
          msg +="This post appears to be blank. Please write something or add photo to post.\n";
        }
        
      }
    
    }
  if(proceed)
  {
    writeD();
    console.log("no error, proceed writing data to firebase");
      proceed = true;
    $("#postModal").modal({backdrop: 'static', keyboard: false});
    
  }
  else
  {
    $("#errModal").modal('toggle');
    var errorMessage = document.getElementById("errMsg");
    errorMessage.innerHTML = msg;
    //alert(msg);
  }
}

function writeD() {
  console.log("writing data to firebase started");
  var db = firebase.database();
  const customers = db.ref().child("Adv");

  var description = document.getElementById("description").value;
  var oriprice = document.getElementById("oriPrice").value;
  var discountrate = document.getElementById("textInput").value;
  var discountRateFrom = document.getElementById("discountRateFrom").value;
  var discountRateTo = document.getElementById("discountRateTo").value;
  var expirydate = document.getElementById("date").value;
  var Specification = document.getElementById("specificationTextArea").value;
  
  //split the shop locations
  var locations = document.getElementById("selected").value.split(",");
  var shopname = document.getElementById("shopName").value;
  var category = localStorage.getItem("Category");
  
  var submitBtn = document.getElementById("upload-submit");
    
  var oriprice1 = String(oriprice);
  var textinput1 = String(discountrate);
  var DisRateFrom = String(discountRateFrom);
  var DisRateTo = String(discountRateTo);
  var adsSpecification = String(Specification);
  var ff;
  
  var modalMsgContainer = document.getElementById("mdlMsg");
  
  //check empty string 
  if(description == "")
  {
    description = "null";
  }
  if(oriprice1 == "")
  {
    oriprice1 = "dummy";
  }
  if(textinput1 =="")
  {
    textinput1 = "dummy";
  }
  if(DisRateFrom =="")
  {
    DisRateFrom = "dummy";
  }
  if(DisRateTo =="")
  {
    DisRateTo = "dummy";
  }
  if(adsSpecification == "")
  {
    adsSpecification = "null";
  }
  
  ff=customers.child(locations[0]).push({
    "Description" : description,
    "Original_Price" : oriprice1,
    "Discount_Rate" : textinput1,
    "Discount_Range" : DisRateFrom +"_"+ DisRateTo,
    "Expiry_Date" : expirydate,
    "Location" : locations[0],
    "Shop_Name" : shopname,
    "Category" : category,
    "Specification" : adsSpecification,
    "Time_Stamp" : firebase.database.ServerValue.TIMESTAMP,
    "Image" : "dummy",
    "Store_Pic" : localStorage.getItem("ProfilePic")
  });
  var folderKey = ff.getKey();
  if(locations.length > 1)
  {
    for(var x = 1 ; x <=locations.length -1 ; x ++)
    {
      ff=customers.child(locations[x] +"/" + folderKey).set({
        "Description" : description,
        "Original_Price" : oriprice1,
        "Discount_Rate" : textinput1,
        "Discount_Range" : DisRateFrom +"_"+ DisRateTo,
        "Expiry_Date" : expirydate,
        "Location" : locations[x],
        "Shop_Name" : shopname,
        "Category" : category,
        "Specification" : adsSpecification,
        "Time_Stamp" : firebase.database.ServerValue.TIMESTAMP,
        "Image" : "dummy",
        "Store_Pic" : localStorage.getItem("ProfilePic")
      });

    } 
  }


  
  if(document.getElementById("advpic").files.length==0){
    //alert("no image");
    modalMsgContainer.innerHTML += '<div class="container-fluid"><h4>Proceed with no image</h4><div>';
    //console.log(getProfilePic(ff,folderKey,customers,locations))
    //var check = getProfilePic(ff,folderKey,customers,locations);
    
    const customer = db.ref().child("Adv");
    customer.once("value").then(function(snapshot){
    //window.location.href = "retailer.html";
    var users = snapshot.val();
    console.log(users);
    
    modalMsgContainer.innerHTML += '<div class="container-fluid"><h4>Upload Successful!</h4></div>';
    modalMsgContainer.innerHTML += '<div class="container-fluid"><button class="btn btn-success form-control" id="btnOK"> OK </button></div>';
      $("#btnOK").click(function(){
        window.location.href = "retailer.html";
      }); 
  });
    
  }else{
    
    var imageFile = document.getElementById("advpic").files[0];
  
    var storageRef = firebase.storage().ref("Adv/"+folderKey+"/"+imageFile.name).put(imageFile);
    storageRef.on('state_changed', function(snapshot){

    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    modalMsgContainer.innerHTML += '<div class="container-fluid"><h6>Upload is '+progress+' % done</h6></div>';
    //modalMsgContainer.innerHTML += '<div class="progress active"><div class="progress-bar progress-bar-success" id="uploadImgProgress"></div></div>';
    //progressBar(progress);
    
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
        var downloadURL = storageRef.snapshot.downloadURL;
        //alert("Upload Successful");
        modalMsgContainer.innerHTML += '<div class="container-fluid"><h4>Upload Successful!</h4></div>';
        for(var y = 0 ; y <=locations.length -1 ; y ++){
          ff=customers.child(locations[y]+"/"+folderKey).update({"Image" : downloadURL});
        }
        modalMsgContainer.innerHTML += '<div class="container-fluid"><button class="btn btn-success form-control" id="btnOK"> OK </button></div>';
        $("#btnOK").click(function(){
          window.location.href = "retailer.html";
        });
        
      });
  }
}
var autocomplete;
var map;
var markerz;
var currentmarker;

function getLocation()
{
  if(navigator.geolocation)
  {
    navigator.geolocation.getCurrentPosition(initMap);
  }
  else
  {
    console.log("Error");
  }
}
function initMap(Position)
{ 
   latt = Position.coords.latitude; 
  Long = Position.coords.longitude; 
  CurrentLocation = {lat: latt, lng: Long};
  
   map = new google.maps.Map(document.getElementById('mapss'), {
          zoom: 10,
          center: CurrentLocation
        });
        //initialze Google AutoComplete 
    var AutoSearch = document.getElementById('AutoSearch');
     var options = {
    types: ['establishment'],
    componentRestrictions: {country: 'MY'}
    };
     autocomplete = new google.maps.places.Autocomplete(
      AutoSearch, {
          componentRestrictions: {country: 'MY'}
            });
     infoWindow = new google.maps.InfoWindow({
          content: document.getElementById('info-content')
        });
     //For Text Search
    places = new google.maps.places.PlacesService(map);
    
     autocomplete.addListener('place_changed',fillInAddress);

}

function fillInAddress()
{
  var AutoSearch = document.getElementById('AutoSearch');
   var componentForm = {
       // street_number: 'long_name',
        //route: 'long_name',
        locality: 'short_name',
      };
  var place = autocomplete.getPlace();


  //var Venue = document.getElementById('Venue');
    if (place.geometry) {
      var locationAdd = document.getElementById("locationAdd");
     // var AddLocation = document.getElementById("AddLocation");
    
    var mapss = document.getElementById("mapss");
    $(locationAdd).slideDown("slow");
    google.maps.event.trigger(map, 'resize');
    
    map.panTo(place.geometry.location);
      /*var address = place.address_components;
    var city = address[address.length -5].long_name;
    console.log(city);*/
        map.setZoom(17);
        console.log(AutoSearch.value)
      var search = {
          bounds: map.getBounds(),
          query : AutoSearch.value,
        };
        places = new google.maps.places.PlacesService(map);
    //mapss.style.display = "block";
     places.textSearch(search, function(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
              if(markerz != null)
              {
                markerz.setMap(null); 
              }
        

        markerz = new google.maps.Marker({
          position:place.geometry.location,
          animation: google.maps.Animation.DROP,
        });
        console.log(results[0].name);
        var address = place.address_components;
        markerz.setMap(map);
        markerz.name = results[0].name;
        console.log(address);

          for (var i = 0; i < place.address_components.length; i++)
           {
                var addressType = place.address_components[i].types[0];
                var addressType2 = place.address_components[i].types[1];
                
              if (componentForm[addressType] && addressType2 == "political") {
                console.log(addressType);
                console.log(addressType2);
                var val = place.address_components[i][componentForm[addressType]];
                    markerz.city  = val;
                    console.log(val);
              }
             }
      
        google.maps.event.addListener(markerz, 'click', showInfoWindow);
        google.maps.event.addListener(infoWindow, 'closeclick', closeInfoWindow);
        setTimeout(dropMarker(markerz), 1 * 100);
          //
      }
          });
        
        //addContent(results[i],markers.length -1);
        } else {
         // document.getElementById('autocomplete').placeholder = 'Enter a city';
        }


}
// Get the place details for a search. Show the information in an info window,
// anchored on the marker  for the search that the user selected.
function showInfoWindow() { 
  currentmarker = this;
    infoWindow.open(map, currentmarker);
    buildIWContent();

}
//show the InfoWindow
function buildIWContent() {
  console.log(markerz.name);
     document.getElementById('Shop-url').innerHTML = markerz.name;
  /*document.getElementById('shop_icon').innerHTML = '<img class="shopIcon" ' +
     'src="' + place.icon + '"/>';*/
}

function closeInfoWindow(){
  var AutoSearch = document.getElementById('AutoSearch');
  AutoSearch.value="";
  currentmarker.setMap(null); 
  markerz = null;
}

function dropMarker(i) {
    return function() {
    markerz.setMap(map);
  
    };
  
} 
function Reloction()
{
  var AutoSearch = document.getElementById('AutoSearch');
  AutoSearch.value="";
  $(locationAdd).slideUp("slow");
  markerz.setMap(null); 
  markerz = null;
  /*  var locationAdd = document.getElementById("locationAdd");
  var AddLocation = document.getElementById("AddLocation");
  AddLocation.style.display = "block";*/
}
function initialize(){
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
  //Initialize Firebase
  


  
  
  /*firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var shopname = document.getElementById("shopName");
      shopname.value = localStorage.getItem("ShopName");
  
      var shopLocation = document.getElementById("location");
  
      var getLocation = localStorage.getItem("ShopLocation").split(",");
  
      var updateOption = document.getElementById("selected");
      updateOption.text = localStorage.getItem("ShopLocation");
      
      var fillShopCategory = document.getElementById("shopCategory");
      fillShopCategory.value = localStorage.getItem("Category");
  
      var FillDropdownLocation = document.getElementById("shopLocationDiv");
      for(var i=0; i<getLocation.length; i++){
      FillDropdownLocation.innerHTML += '<div class="container-fluid"><label for="'+'check'+i+'"><input type="checkbox" id="'+'check'+i+'" name="checkChecked" value="'+getLocation[i]+'" onchange="checkMe()" checked/>'+getLocation[i]+'</label></div>';
      console.log(FillDropdownLocation);
      }

      console.log("Sign in user : " + user.uid);
      console.log("Sign in user : " + user.email);
      userEmail=user.email;
      console.log("r : " +userEmail);
      //Check exist 3 adv or not
      var sorteddata = [];
      var checkLoc = [] ;
      var checkkey="";
      var count = 0 ;
      var keys = [] ;
  
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
    
    
      var shoppingMallName = localStorage.getItem("ShopLocation").split(",");
      console.log(shoppingMallName.length);
      for(var i=0; i<shoppingMallName.length; i++){
        
        getJSON('https://sppm1-6f7df.firebaseio.com/Adv/'+shoppingMallName[i]+'.json?&OrderBy="Shop_Name"&equalsTo='+'"'+localStorage.getItem("ShopName")+'"'+'&print=pretty').then(function(data){
          //drawPanel(data);
          for(var key in data)
          {
            if(data.hasOwnProperty(key))
            {
              if(data[key].Shop_Name == localStorage.getItem("ShopName"))
              {
                  var newdata = data[key];
                  Object.defineProperty(newdata, 'key', {
                  value: key,
                  enumerable: false
                  });
                  sorteddata.push(newdata);       
              }
            }
          }
          
      

          if((shoppingMallName.length-1) == count)
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
            
            console.log(sorteddata);
            if(sorteddata.length >=3)
            {
              var btn =document.getElementById("upload-submit"); 
              btn.disabled = true; 
            }
            else
            {
              var btn =   document.getElementById("upload-submit"); 
              btn.disabled = false; 
            }
            
          }
          count++;
        }, function(status) { //error detection....
          //alert('Something went wrong.');
           modalMsgContainer.innerHTML += '<h4>Opps! Something went wrong! Please try posting again!</h4>';
        });   
      }
    }else{
      // No user is signed in.
      console.log("No User");
        //$('#Singin').modal({backdrop: 'static', keyboard: false})   
        //window.location.href="signIn.html";
    }
  });*/
  
      
  
}

function backToSignInPage()
{
  location.href = "signIn.html";
}


/*function progressBar(progress){
  var elem = document.getElementById("uploadImgProgress");   
  var width = 10;
  var id = setInterval(frame, 15);
  function frame() {
    if (width >= progress) {
      clearInterval(id);
    } else {
      width++; 
      elem.style.width = width + '%'; 
      elem.innerHTML = width * 1  + '%';
    }
  }
}*/

$('#PostInfo-form').submit(function(e) {

var Return =true;
var modalMsgContainer = document.getElementById("mdlMsg");
 e.preventDefault();
	console.log("here");
	var Array_data = [];
 
  //Convert Array to Json Data
  var formData =  $(this).serialize().split("&");
  var InfoJson = get_all_post_data(formData);
  var msg = validationPost(InfoJson);
  console.log(InfoJson);
  console.log("Error : " + msg);

if(msg == "")
{
  $("#postModal").modal({backdrop: 'static', keyboard: false});
    if(InfoJson.reward.rewardsystem == "on")
    {
      var count = 0;
      var reward_count = Object.keys(InfoJson.reward.rewards).length-1;
      console.log("sss: " + reward_count);
      for(var data in InfoJson.reward.rewards)
      {
        var image = "rewardpic" + count;
        var rewardimages = document.getElementById(image);
         uploadImageAsPromise(rewardimages.files[0]).then(function(defs){
            Array_data.push(defs);
            console.log(Array_data);
            console.log(filenames);
            if(filenames.length-1 == reward_count)
            {
              for(var y = 0 ;  y <filenames.length ; y++)
              {
                 var counts = 0;
                for(var data in InfoJson.reward.rewards)
                {
                  var image = "rewardpic" + counts;
                  var rewardimages = document.getElementById(image);
                  if(document.getElementById(image).files[0].name == filenames[y])
                  {     
                    InfoJson.reward.rewards[data].reward_pic = Array_data[y];
                  }
                  counts++;
                }
                if(y == reward_count)
                {
                  console.log("done");
                  console.log(InfoJson);
                  if(document.getElementById("advpic").files.length==0)
                  {
                    InfoJson["event_picture"] = "dummy";
                     console.log(InfoJson);
                    $.ajax({
                      url:  window.location.href + "/CheckPostInfo",
                      data: InfoJson,
                      type: 'POST',
                      dataType: 'json',
                      success: function(data) {
                        console.log(data.proceed);
                        modalMsgContainer.innerHTML += '<div class="container-fluid"><button class="btn btn-success form-control" id="btnOK"> OK </button></div>';
                        $("#btnOK").click(function(){
                        window.location.href = data.proceed;
                        });
                      },
                      error: function(xhr, status, error) {
                      }
                    });
                  }
                  else
                  {
                    var imageFile = document.getElementById("advpic").files[0];
                    var event_pic = firebase.storage().ref("Events/ " +imageFile.name).put(imageFile);
                    event_pic.on('state_changed', function(snapshot){
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
                    var downloadURL = event_pic.snapshot.downloadURL;
                    console.log("Upload Successful");
                    InfoJson["event_picture"] = downloadURL;
                    console.log(InfoJson);
                     $.ajax({
                      url: window.location.href + "/CheckPostInfo",
                      data: InfoJson,
                      type: 'POST',
                   
                      success: function(data) {
                        console.log(data.proceed);
                        modalMsgContainer.innerHTML += '<div class="container-fluid"><button class="btn btn-success form-control" id="btnOK"> OK </button></div>';
                        $("#btnOK").click(function(){
                        window.location.href = data.proceed;
                        });
                      },
                      error: function(xhr, status, error) {
                      }
                    });
                   });
                  }
                }
              }
            }
         });
         count++;
      }
    }
    else
    {
      if(document.getElementById("advpic").files.length==0)
      {
        InfoJson["event_picture"] = "dummy";
        console.log(InfoJson);
         $.ajax({
            url:  window.location.href + "/CheckPostInfo",
            data: InfoJson,
            type: 'POST',
            dataType: 'json',
            success: function(data) {
            console.log(data.proceed);
            modalMsgContainer.innerHTML += '<div class="container-fluid"><button class="btn btn-success form-control" id="btnOK"> OK </button></div>';
            $("#btnOK").click(function(){
            window.location.href = data.proceed;
            });
            },
            error: function(xhr, status, error) {
            }
            });
      }
      else
      {
        var imageFile = document.getElementById("advpic").files[0];
        var event_pic = firebase.storage().ref("Events/ " +imageFile.name).put(imageFile);
        event_pic.on('state_changed', function(snapshot){
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
        var downloadURL = event_pic.snapshot.downloadURL;
        console.log("Upload Successful");
        InfoJson["event_picture"] = downloadURL;
        console.log(InfoJson);
      $.ajax({
          url: window.location.href + "/CheckPostInfo",
          data: InfoJson,
          type: 'POST',
          success: function(data) {
            console.log(data.proceed);
            modalMsgContainer.innerHTML += '<div class="container-fluid"><button class="btn btn-success form-control" id="btnOK"> OK </button></div>';
          $("#btnOK").click(function(){
            window.location.href = data.proceed;
          });
          },
          error: function(xhr, status, error) {
          }
        });
      });
    }
    }
}
else
{
    $("#errModal").modal('toggle');
    var errorMessage = document.getElementById("errMsg");
    errorMessage.innerHTML = msg;
}

});
function get_all_post_data(formData)
{
    var InfoJson={};
   console.log(formData);
  
    var RewardJson = {};
    for(var key in formData)
    {
        if(formData[key].split("=")[0] == "invited_retailer")
        {
          if(InfoJson.invited_retailer)
          {
            var data = InfoJson["invited_retailer"] +","+ formData[key].split("=")[1];
            InfoJson["invited_retailer"] = data;
          }
          else
          {
        InfoJson[formData[key].split("=")[0]] = formData[key].split("=")[1];
          }        
        }
        else
        {
           InfoJson[formData[key].split("=")[0]] = formData[key].split("=")[1];
        }
    }
    //attribute 
     console.log(formData[0].split("=")[0]);
     //value
     console.log( formData[0].split("=")[1]);

    //Convert Decode %
    for (var key in InfoJson) {
    InfoJson[key] = decodeURIComponent(InfoJson[key]);
  }

  //get all the particaption into other json
  var ParticpationArry ={};
  var ParticipationJson = {};
  var participateJson = {}
  if(InfoJson.participate)
  {
    console.log("ddd");
    console.log(InfoJson);
    var par={};
    delete InfoJson["participate"];
    for(var x = 0 ; x < 4 ; x++)
    {
      ParticpationArry = {};

      for(var key in InfoJson)
      {
        
        var ticket_type = "ticket_type" + x;
        var ticket_price = "ticket_price" +x;
        var ticket_title = "ticket_title" + x;
        var ticket_description = "ticket_description" + x;
        var available_ticket = "available_ticket" + x;
        var ticket_start_date = "ticket_start_date" + x;
        var ticket_end_date = "ticket_end_date" + x;
        if(key == ticket_type)
        {

          ParticpationArry["ticket_type"] = InfoJson[key];
          delete InfoJson[key];
        }
        if(key == ticket_price)
        {
          ParticpationArry["ticket_price"] = InfoJson[key];
          delete InfoJson[key];
        }
        if(key == ticket_title)
        {
          ParticpationArry["ticket_title"] = InfoJson[key];
          delete InfoJson[key];
        }
        if(key == ticket_description)
        {
          ParticpationArry["ticket_description"] = InfoJson[key];
          delete InfoJson[key];
        }
        if(key == available_ticket)
        {
          ParticpationArry["available_ticket"] = InfoJson[key];
          delete InfoJson[key];
        }
        if(key == ticket_start_date)
        {
          ParticpationArry["ticket_start_date"] = InfoJson[key];
          delete InfoJson[key];
        }
        if(key == ticket_end_date)
        {
          ParticpationArry["ticket_end_date"] = InfoJson[key];
          delete InfoJson[key];
        }
        if(!(jQuery.isEmptyObject(ParticpationArry)))
        {
          console.log("sss");
          ParticipationJson["ticket_" + x] = ParticpationArry;
        }
        
    }
    var ticetsjson = {};
    ticetsjson["tickets"] = ParticipationJson;
    InfoJson["participation"] = ticetsjson;
    InfoJson.participation["participate"] = "on";

    }
     if(jQuery.isEmptyObject(InfoJson.participation.tickets))
     {
        delete InfoJson.participation.tickets;
     }
  }
  else
  {
    ParticpationArry["participate"] = "off";
    ParticipationJson = ParticpationArry;
    InfoJson["participation"] = ParticipationJson;
  }
    
  //get all the reward into other json
  var RewardArrys ={};
  var RewardJson = {};
  var d = [];

  if(InfoJson.rewardsystem)
  {
    console.log("ddd");

    for(var x = 0 ; x < 4 ; x++)
    {
      var RewardArry ={};
      for(var key in InfoJson)
      {
        var reward_point = "reward_cost" + x;
         var reward_name = "reward_name" + x;
        var reward_description = "reward_description" +x;
        if(key == reward_point)
        {
          RewardArry["reward_cost"] = InfoJson[key];
          delete InfoJson[key];
        }
        if(key == reward_description)
        {
          RewardArry["reward_description"] = InfoJson[key];
          delete InfoJson[key];
        }
        if(key == reward_name)
        {
          RewardArry["reward_name"] = InfoJson[key];
          delete InfoJson[key];
        }
        if(!(jQuery.isEmptyObject(RewardArry)))
        {
          RewardJson["reward_" + x] = RewardArry;
        }

      }
      var rewardsjson = {};
      rewardsjson["rewards"] = RewardJson;
      InfoJson["reward"] = rewardsjson;
      InfoJson.reward["rewardsystem"] = "on";
      InfoJson.reward["reward_point"] = InfoJson.reward_point;
      InfoJson.reward["term_condition"] = InfoJson.term_condition;
    }
    if(jQuery.isEmptyObject(InfoJson.reward.rewards))
    {
      console.log("Rewards is empty");
      delete InfoJson.reward.rewards;
      delete InfoJson.term_condition;
      delete InfoJson.rewardsystem;
      delete InfoJson.reward_point;
    }
    else
    {
      var rewardcount = 0;
       for(var key in InfoJson.reward.rewards)
       {
          if($('#rewardpic' + rewardcount).val() =="")
          {
            InfoJson.reward.rewards[key].reward_pic="";
          }
          else
          {
            InfoJson.reward.rewards[key].reward_pic=$('#rewardpic' + rewardcount).val();
            //console.log(document.getElementById("rewardpic" + rewardcount).files[0]);
          }
          rewardcount++;
       }
       
      delete InfoJson.term_condition;
      delete InfoJson.rewardsystem;
      delete InfoJson.reward_point;
    }
     
  }
  else
  {
    var arry = {};
    arry["rewardsystem"] = "off";
    InfoJson["reward"] =arry;
  }
  
  
  //collaboration 
  var collaborateArry ={};
  if(InfoJson.collaborate)
  {
    collaborateArry["collaborate"] = InfoJson.collaborate;
    delete InfoJson.collaborate;
    if(InfoJson.publicity)
    {
      collaborateArry["publicity"] = InfoJson.publicity;
      delete InfoJson.publicity;
      if(InfoJson.invited_retailer)
      {
        collaborateArry["invited_retailer"] = InfoJson.invited_retailer;
        delete InfoJson.invited_retailer;
      }
      else
      {
        collaborateArry["invited_retailer"] = "off";
      }
    }
    else
    {
      collaborateArry["publicity"] = "off";
      if(InfoJson.invited_retailer)
      {
        collaborateArry["invited_retailer"] = InfoJson.invited_retailer;
        delete InfoJson.invited_retailer;
      }
      else
      {
        collaborateArry["invited_retailer"] = "off";
      }
    }
  }
  else
  {
    collaborateArry["collaborate"] = "off";
  }
  InfoJson["collaboration"] = collaborateArry;
  //Survey
  var questionOption = ["shortanswer","multichoice","checkboxchoice","select"];
  var test = []; 
  var surveyJson = {};
  
  var tittle = {};
//if surveysystem on 
if(InfoJson.surveysystem)
{
   console.log("on");
  //get all question
  for(var surveyKey in InfoJson)
  {
    var g ={};
    for(var x = 0 ; x < 9 ; x++)
    {
      for(var y = 0 ; y < questionOption.length; y++)
      {
        if(surveyKey == questionOption[y] + "_q_" + x)
        {
          g["question_type"] = questionOption[y];
          g["question_title"] = InfoJson[surveyKey];
          g["question_input"] = "dummy";
          surveyJson["question_" + x] = g;
          delete InfoJson[surveyKey];
        }
      }
    }
  }
  if(jQuery.isEmptyObject(surveyJson))
  {
    console.log("Is empty");

    InfoJson["survey"] = {surveysystem : InfoJson.surveysystem};
    delete InfoJson.surveysystem;
  }
  else
  {
    console.log("not empty");
    for(var surveyKey in InfoJson)
    {
      var cout = 0;
      for(var key in surveyJson)
      {
        for(var y = 0 ; y < 9 ; y++)
        {
          if(surveyKey == surveyJson[key].question_type + "_q_" + cout + "_input_" + y)
          {
            if(surveyJson[key].question_input.includes("dummy"))
            {
              surveyJson[key].question_input = "";
            }
            surveyJson[key].question_input +=  InfoJson[surveyKey] +",";
            delete InfoJson[surveyKey];
          }
        }   
        cout++;
      }
     
  }
   //remove last comma
      for(var key in surveyJson)
      {
        var g = surveyJson[key].question_input;
        var ds =g.replace(/,\s*$/, "");
        console.log(ds);
        surveyJson[key].question_input = ds;
      } 
  InfoJson["survey"] = {surveysystem : InfoJson.surveysystem};
  delete InfoJson.surveysystem;
  InfoJson.survey["questions"] = surveyJson;
  }
}
else
{
  InfoJson["survey"] = {surveysystem : "off"};
  console.log("off");
}
  return InfoJson;
}   

function validationPost(InfoJson)
{
  var dropdownAdPic = document.getElementById("adPicList");
  var msg="";
  //============ POST INFO  ===================//
  //check event_title
  if(InfoJson.event_title == "")
  {
     msg +="<br>Please input Event title";
  }
  //check category
  if(!(InfoJson.category))
  {
    msg +="<br>Please select Category";
  }
  //check Address 
  if(InfoJson.address == "")
  {
    msg +="<br>Please input Address";
  }
  else
  {
    InfoJson ["city"] = markerz.city;
    InfoJson ["latlng"] = markerz.position.lat() + "," + markerz.position.lng();
  }
  //check event start_end date
  if(InfoJson.start_date == "")
  {
    msg +="<br>Please select event Start Date";
  }
  else
  {
    if(InfoJson.end_date == "")
    {
      msg +="<br>Please select event End Date";
    }
  }
  //check description
  if(InfoJson.description == "")
  {
     msg +="<br>Please input event Description";
  }
  //check event pic
/*  if(dropdownAdPic.style.display == "none")
  {
    if(document.getElementById("advpic").files.length==0)
    {
      msg +='<br>no image';
    }  
  }*/
//============ Participation  ===================//
if(InfoJson.participation["participate"] == "on")
{
   console.log("ParticipationSwitch : on");
  if(InfoJson.participation.tickets)
  {
    console.log("have tickets");
    //Check Ticket Type
    for(var key in InfoJson.participation.tickets)
    {
        //console.log(InfoJson.participation.tickets[key].ticket_type);
        if(InfoJson.participation.tickets[key].ticket_type)
        {
          if(InfoJson.participation.tickets[key].ticket_type == "Free")
          {
            console.log("Free");
            if(InfoJson.participation.tickets[key].ticket_price != "")
            {
              msg += '<br>' +key +": "+"free ticket cant have ticket price";
              
            }
          else
          {
            InfoJson.participation.tickets[key].ticket_price = "Free";
          }
        }
        else
        {
          console.log(" Not Free");
          //Check Ticket Price
          if(InfoJson.participation.tickets[key].ticket_price =="")
          {
            msg +='<br>'+key +": " + "no Ticket price";
            
          }
          else
          {
            if(parseInt(InfoJson.participation.tickets[key].ticket_price) <= 0)
            {
              msg +='<br>'+key +": " + "Ticket_Price < 0";
              
            }
          }
        }
        //check No. of Participations
        if(InfoJson.participation.tickets[key].available_ticket == "")
        {
          msg +='<br>'+key +": " + "no Participations";
          
        }
        else
        {
          if(parseInt(InfoJson.participation.tickets[key].available_ticke) <= 0)
          {
            msg +='<br>'+key +": " +"Participations <= 0";
           
          }
        }

        //check ticket tittle
        if(InfoJson.participation.tickets[key].ticket_title == "")
        {
          msg +='<br>'+key +": " + "no ticket tittle";
         
        }
        ////check ticket Description
        if(InfoJson.participation.tickets[key].ticket_description == "")
        {
          msg +='<br>'+key +": " + "no ticket description";
          
        }
        //check ticket date
        if(InfoJson.participation.tickets[key].ticket_start_date == "")
        {
          msg +='<br>'+key +": " + "no ticket start date";
          
        }
        if(InfoJson.participation.tickets[key].ticket_end_date == "")
        {
          msg +='<br>'+key +": " + "no ticket end date";
          
        }
      }
      else
      {
       msg +='<br>'+key +": " + "ticketType no selected";
       
      }
    }
  }
  else
  {
    console.log("have no tickets");
    msg +='<br>Please add at least one ticket';
  } 
}
//============ Collaboration  ===================//
if(InfoJson.collaboration.collaborate == "on")
{
  if(InfoJson.collaboration.publicity == "off" && InfoJson.collaboration.invited_retailer == "off")
  {
    msg +='<br>Please choose publicity or invited_retailer';
  }
}
//============ Survey  ===================//
if(InfoJson.survey.surveysystem == "on")
{
  if(InfoJson.survey.questions)
  {
    for(var key in InfoJson.survey.questions)
    {
      if(InfoJson.survey.questions[key].question_type == "shortanswer")
      {
        if(InfoJson.survey.questions[key].question_title == "")
        {
         msg +='<br>'+key +": " + "Please input question_title";
        }
      }
      if(InfoJson.survey.questions[key].question_type == "multichoice")
      {
        if(InfoJson.survey.questions[key].question_title == "")
        {
          msg +='<br>'+key +": " + "Please input question_title";
        }
        else
        {
          var q_array = InfoJson.survey.questions[key].question_input.split(","); 
          console.log(q_array);
          for(var x = 0 ; x <q_array.length ; x++)
          {
            if(q_array[x] == "")
            {
              msg +='<br>'+key +"_input_"+x+": " + "Please input question";
            }
          }
        }
      }
      if(InfoJson.survey.questions[key].question_type == "checkboxchoice")
      {
        if(InfoJson.survey.questions[key].question_title == "")
        {
          msg +='<br>'+key +": " + "Please input question_title";
        }
        else
        {
          var q_array = InfoJson.survey.questions[key].question_input.split(","); 
          console.log(q_array);
          for(var x = 0 ; x <q_array.length ; x++)
          {
            if(q_array[x] == "")
            {
              msg +='<br>'+key +"_input_"+x+": " + "Please input question";
            }
          }
        }
      }
      if(InfoJson.survey.questions[key].question_type == "select")
      {
        if(InfoJson.survey.questions[key].question_title == "")
        {
          msg +='<br>'+key +": " + "Please input question_title";
        }
        else
        {
          var q_array = InfoJson.survey.questions[key].question_input.split(","); 
          console.log(q_array);
          for(var x = 0 ; x <q_array.length ; x++)
          {
            if(q_array[x] == "")
            {
              msg +='<br>'+key +"_input_"+x+": " + "Please input question";
            }
          }
        }
      }
    }
  }
  else
  {
     msg +='<br>Please add at least one survey question';
  }
}
//============ Reward  ===================//
if(InfoJson.reward.rewardsystem == "on")
{
  if(InfoJson.reward.reward_point == "")
  {
     msg +='<br>Please input reward point';
  }
  if(InfoJson.reward.term_condition == "")
  {
    msg +='<br>Please input term_condition';
  }
  if(InfoJson.reward.rewards)
  {
    console.log("sss");
    for(var key in InfoJson.reward.rewards)
    {
      if(InfoJson.reward.rewards[key].reward_cost == "")
      {
         msg +='<br>'+key +": " + "Please input reward cost";
      }
      if(InfoJson.reward.rewards[key].reward_description == "")
      {
         msg +='<br>'+key +": " + "Please input reward description";
      }
      if(InfoJson.reward.rewards[key].reward_pic == "")
      {
         msg +='<br>'+key +": " + "Please input reward pic";
      }
      if(InfoJson.reward.rewards[key].reward_name == "")
      {
         msg +='<br>'+key +": " + "Please input reward name";
      }
    }
  }
  else
  {
    msg +='<br>Please add at least one reward';
  }
}
return msg;
}


      
 //Handle waiting to upload each file using promise
 var filenames  = [];
function uploadImageAsPromise (imageFile) {
  
    return new Promise(function (resolve, reject) {
       var storageRef = firebase.storage().ref("events/rewards/ " +imageFile.name);

        //Upload file
        var task = storageRef.put(imageFile);

        //Update progress bar
        task.on('state_changed',
            function progress(snapshot){
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
            },
            function error(err){

            },
            function complete(){
                var downloadURL = task.snapshot.downloadURL;
               filenames.push(storageRef.name.trim());
                resolve(downloadURL);
            }
        );
    });
}




