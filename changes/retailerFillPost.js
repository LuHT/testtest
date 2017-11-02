var infoLocation=[]; 
var Advcount= 0;
var couns=0;

function drawPanel(data){
		var container = document.getElementById("container_row");
		draw(container, data);	
}

function draw(container, data){

		//console.log(data);
			if(data.length == 0){
				container.innerHTML = '<div class="container-fluid"><label>No promotion can be found.</label><button class="btn btn-primary form-control" onclick="postAds()">Post an Ad now!</button></div>';
			}else{
				for(var key= 0 ; key < data.length ; key++)
				{

					var ShopLocations = data[key].Location.replace(/,/g,"@");
					
						//var replaceComma = localStorage.getItem("ShopLocation");
							var description = data[key].Description;
								if(description == "null"){
									description = "";
								}
								
							var imageDiv = data[key].Image;
							var imageDivInput = "";
								if(imageDiv=="dummy"){
									imageDivInput = '<div class="row" style="margin-left:-30px; margin-right:-30px;"><div class="container-fluid" style="display:none"></div></div>';
								}else{
									imageDivInput = '<div class="row" style="margin-left:-30px; margin-right:-30px;"><div class="container-fluid"><img src="'+data[key].Image+'" class="img-responsive" style="width=100%;" alt="Image"></div></div>';
								}
								
							var oriprice = data[key].Original_Price;
							var rate = data[key].Discount_Rate;
							var range = data[key].Discount_Range;
							var priceLabel = "";
							
							if(oriprice!="dummy"){
								if(rate!="dummy"){
									var intPrice = parseInt(oriprice);
									var intRate = parseInt(rate);
										intRate = (intRate / 100);
									var afterDiscount = intPrice - (intPrice * intRate);
									
									priceLabel = '<div class="row"><div class="col-xs-12 col-sm-12" style="height:25px;"><h5 style="color:pink"><center><span style="font-size:16px; height:30px;" id="">RM '+afterDiscount.toFixed(2)+'</span></center></h5></div></div>'
												+ '<div class="row"><div class="col-xs-6 col-sm-6"><h5 class="pull-right" style="margin-right:-20px;"><strike> RM '+oriprice+'</strike></h5></div><div class="col-xs-6 col-sm-6"><h5 class="pull-left"><span class="label label-default" style="font-size:13px; background-color:#f77676;">-'+rate+'%</span></h5></div></div>';
									
								}else{
									priceLabel = '<div class="col-xs-12 col-sm-12"><span><center>RM '+oriprice+'</center></span></div>';
								}
							}else{
								if(range!="dummy_dummy"){
									var priceRange = range.split("_");
									if(priceRange[0]=="dummy"){
										priceLabel = '<div class="col-xs-12 col-sm-12"><h5><center><span class="label label-default" style="font-size:13px; background-color:#f77676;">Up to '+priceRange[1]+'%</span></center></h5></div>';
									}else if(priceRange[1]=="dummy"){
										priceLabel = '<div class="col-xs-12 col-sm-12"><h5><center><span class="label label-default" style="font-size:13px; background-color:#f77676;">Starts From '+priceRange[0]+'%</span></center></h5></div>';
									}else{
										priceLabel = '<div class="col-xs-12 col-sm-12"><h5><center><span class="label label-default" style="font-size:13px; background-color:#f77676;">From '+priceRange[0]+'% to '+priceRange[1]+'%</span></center></h5></div>';
									}
								}
							}
							
						//onclick="deletePanel(\''+data[key].key+'\',\''+data[key].Location+'\',\''+couns+'\');"
							container.innerHTML += '<div class="col-sm-4" id="'+data[key].key+'" style="max-width:300px; min-width:300px; margin-top:20px;">'
							+ '<div class="panel panel-primary" style="box-shadow: 10px 10px 10px #888888;">'
							+ '<div class="panel-body">'
							+ '<div class="container-fluid">'
							+ '<div class="row">'     
							+ '<div class="col-xs-12 col-sm-12"><button id ="'+couns+'" data-container="body" data-id="'+data[key].key+','+data[key].Location+'" class="btn btn-primary pull-right confirmation-callback" data-toggle="confirmation"  data-on-confirm="deletePanel" data-placement="bottom" data-popout="true" data-singleton="true"><span class="glyphicon glyphicon-trash fa-lg"></span></button></div>'
							+ '<div id="dialog-confirm"></div>'
							+ '<div class="row clearfix">'
							+ '<div class="col-xs-2 col-sm-2">'
							+ '<div style="display:inline-block;vertical-align:top;">'
							+ '<img src="'+data[key].Store_Pic+'" style="width:50px; height:50px;" alt="profileImage"/>'
							+ '</div></div>'
							+ '<div class="col-xs-10 col-sm-10">'
							+ '<div style="display:inline-block; margin-left:10px;">'
							+ '<h4 style="font-size:13px; margin-top:5px; margin-bottom:-1px;">'+data[key].Shop_Name+'</h4>'
							+ '<span style="font-size:11px;">'+ShopLocations+'</span>'
							+ '<h6 style="font-size:9px; margin-top:3px;">'+Converttimestamp(data[key].Time_Stamp)+'</h6></div></div></div>'
							+ '<div class="row">'
							+ '<div class="container-fluid">'
							+ '<div class="col-md-12">'
							+ '<h4 style="font-size:12px;">'+description+'</h4>'
							+ '</div></div></div>'
							+ imageDivInput
							+ '<div class="row">'
							+ priceLabel
							+ '</div><div class="row" style="margin-top:10px;background-color:#ffcccc; height:25px;">'
							+ '<h5 style="margin-top:5px; margin-bottom:-2px;"><center>'+expirydate(data[key].Expiry_Date)+'</center></h5></div><br>'
							+ '<div class="row"><button class="btn btn-primary form-control" data-toggle="modal" data-target="#myModal" onclick="GenerateQR(\''+data[key].key+'\',\''+data[key].Rkey +'\')">Generate QR <span class="glyphicon glyphicon-qrcode"></span></button></div>'
							+ '</div></div></div></div>';
					couns++;
				}
				$('#loadercontainer').remove();
			}
$('[data-toggle=confirmation]').confirmation({
  rootSelector: '[data-toggle=confirmation]',title :"Delete post advertisement",content:"Are you sure going to delete this advertisement"
 
});

}

function deletePanel(){
	
	 var Info = $(this)[0].getAttribute('data-id').split(",");
	 var deleteId = Info[0];
	 var deleteThisPanel = document.getElementById(deleteId);
	 var Shop_Location = [];
	 for(var i =1; i <=Info.length-1 ; i++)
	 {
		 Shop_Location.push(Info[i]);
	 }
	
	var db = firebase.database();
		const deleteAdv = db.ref().child("Adv");
		for(var d = 0 ; d <=Shop_Location.length-1; d++ )
		{
			deleteAdv.child(Shop_Location[d]+"/" +deleteId).remove();
		}
		
		deleteThisPanel.remove();
		Advcount--;
}



function expirydate(Edate)
{
//console.log("timestamp here");
	
	var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
	var current = new Date();
	var exp = new Date(Edate +" 23:59:59");
   var elapsed = exp - current;
   //console.log(exp);
	var timestamp="ss";
	if(elapsed< 0)
	{
		//console.log("experied");
		
		if (Math.abs(elapsed)< msPerMinute) {
         timestamp = 'expired ' + Math.abs(Math.round(elapsed/1000)) + ' seconds ago';   
		}
		else if (Math.abs(elapsed) < msPerHour) {
         timestamp = 'expired ' + Math.abs(Math.round(elapsed/msPerMinute)) + ' minutes ago';   
		}

		else if (Math.abs(elapsed) < msPerDay ) {
        timestamp = 'expired ' + Math.abs(Math.round(elapsed/msPerHour )) + ' hours ago';   
		}

		else if (Math.abs(elapsed) < msPerMonth) {
		//Math.round(elapsed/msPerDay) + ' days ago'
        var checkday = Math.abs(Math.round(elapsed/msPerDay)); 
		//console.log(checkday);
		if(checkday == 1)
		{
			timestamp = 'expired ' + checkday + ' day ago'; 
		}
		else if(checkday >1 && checkday<=7)
		{
			timestamp = 'expired ' + Math.abs(Math.round(elapsed/msPerDay)) + ' days ago';
		}
		else{
			var expSplit = exp.toString().split(" ");
			
			timestamp = "expired on " + expSplit[1] + " " + expSplit[2];
		}
		

		}
		else if (elapsed < msPerYear) {
			var expSplit = exp.toString().split(" ");
				
				timestamp = "expired on " + expSplit[1] + " " + expSplit[2];
		}
		
	}
	else{
		//console.log("going exp");
		//console.log(elapsed);
		if (elapsed < msPerMinute) {
         timestamp = 'expires In ' + Math.round(elapsed/1000) + ' seconds';   
		}
		else if (elapsed < msPerHour) {
         timestamp = 'expires In ' + Math.round(elapsed/msPerMinute) + ' minutes';   
		}

		else if (elapsed < msPerDay ) {
        timestamp = 'expires In ' + Math.round(elapsed/msPerHour ) + ' hours';   
		}

		else if (elapsed < msPerMonth) {
		//Math.round(elapsed/msPerDay) + ' days ago'
		//console.log("permonr");
        var checkday = Math.round(elapsed/msPerDay); 
			if(checkday == 1)
			{
				timestamp = 'expires Tomorrow'; 
			}
			else if(checkday >1 && checkday<=7)
			{
				timestamp = 'expires In ' + Math.round(elapsed/msPerDay) + ' days';
			}
			else{
				var expSplit = exp.toString().split(" ");
				
				timestamp = "expires on " + expSplit[1] + " " + expSplit[2];
			}

		} 
		 else if (elapsed < msPerYear) {
			var expSplit = exp.toString().split(" ");
				
				timestamp = "expires on " + expSplit[1] + " " + expSplit[2];
		}

	}
    return timestamp;
	//console.log(timestamp);
}




function init2()
{	
	var keyprocced = true;
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
			$.ajax({
		        url: window.location.href + "/getData",
		        type: 'POST',
		        success: function(data) {
		        	console.log(data.AvdData);
		        	drawPanel(data.AvdData);
		        },
	      		error: function(xhr, status, error) {
	 			
			}
	   		});


			$.ajax({
		        url: window.location.href + "/checknotification",
		        type: 'POST',
		        success: function(data) {
		      	if(data.notification_count == "no notification")
		      	{
		      		//console.log("no notification")
		      	}
		      	else
		      	{
		      		if(data.notification_count == 0){
		      			document.getElementById("notificationSpan").style.display = "none";
		      		}else{
		      			document.getElementById("notificationSpan").style.display = "block";
		      			document.getElementById("notificationSpan").innerHTML = data.notification_count;
		      		}
		      		
		      		//	console.log(data.notification_count);
		      	}
		        },
	      		error: function(xhr, status, error) {
	 			
			}
	   		});

	   		$.ajax({
		        url: window.location.href + "/getcollaboration",
		        type: 'POST',
		        success: function(data) {
			      	if(data.event_data == "no event collaboration")
			      	{
			      		//console.log("no event collaboration");
			      	}
			      	else
			      	{
			      		//console.log("collaboration event");
			      		//console.log(data.event_data);
			      		var collaboratedEvent = data.event_data;
			      		drawCollaboratedEvent(collaboratedEvent);
			      	}
		        },
	      		error: function(xhr, status, error) {
	 			
				}
	   		});	
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
    }
    else if (elapsed < msPerHour) {
         timestamp = Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
        timestamp = Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
		//console.log("Test1:");
		//Math.round(elapsed/msPerDay) + ' days ago'
        var checkday = Math.round(elapsed/msPerDay); 
		if(checkday == 1)
		{
			timestamp = 'Yesterday';
		}
		else if(checkday >1 && checkday<=7)
		{
			timestamp = Math.round(elapsed/msPerDay) + ' days ago';
		}
		else{
			timestamp = "just date nia ba";
		}

    } 
	else{
		
		var check = Math.round(elapsed/msPerMonth);
		if(check == 1)
		{
				timestamp = Math.round(elapsed/msPerMonth) + ' Month ago';
		}
		else{
			timestamp = Math.round(elapsed/msPerMonth) + ' Months ago';
		}
	
	}
	//console.log("Test1:" + elapsed);
	//console.log("Test:" + timestamp);
	return timestamp;
}


//Generate QRCode
function GenerateQR(key,Rkey)
{
	var typeNumber = 4;
			var errorCorrectionLevel = 'L';
			var qr = qrcode(typeNumber, errorCorrectionLevel);
			qr.addData(key+","+Rkey);
			qr.make();
			document.getElementById('QRCode').innerHTML = qr.createImgTag(4);	
}


function SignOut(){
	//console.log("ddd");
	//console.log("Logout");	
	firebase.auth().signOut().then(function() {
 	localStorage.clear();
	//console.log("Sign out Success");
		$.post(window.location.href,{Signout: "yes"}, function(data){
          	window.location = data.redirect;
          });
	}).catch(function(error) {
	});
}

function checkNav(){
	var sidenav = document.getElementById("mySidenav");
	if(sidenav.style.width =="250px"){
		document.getElementById("mySidenav").style.width = "0";
		document.getElementById("main").style.marginLeft= "0";
		$("#navbar").collapse('show');
	}
}

function openNav(){
	if($("#navbar").is(":visible")){
		$("#navbar").collapse('hide');
	}

	var sidenav = document.getElementById("mySidenav");
	if(sidenav.style.width =="250px"){
		document.getElementById("mySidenav").style.width = "0";
		document.getElementById("main").style.marginLeft= "0";
	}else{
		document.getElementById("mySidenav").style.width = "250px";
		document.getElementById("main").style.marginLeft = "0";
	}
}

function postAds(){
	window.location.href="retailerPost.html";
}

/* 16/10/2017 - josh - collaborated event */
function drawCollaboratedEvent(data){
	console.log(data);
	//console.log(data.length);

	var eventKey;
	var eventAdd;
	var eventPic;
	var eventDesc;
	var eventSDate;
	var eventEDate;
	var organizerName;
	var organizerPic;
	var organizerCate;
	var timestamp;

	for(var i=0; i<data.length; i++){
		eventAdd = data[i].address;
		 
		eventKey = data[i].event_key;
		eventAdd = data[i].address;
		eventPic = data[i].event_picture;
		eventDesc = data[i].description;
		eventSDate = data[i].start_date;
		eventEDate = data[i].end_date;
		organizerName = data[i].organizer_name;
		organizerPic = data[i].organizer_pic;
		organizerCate = data[i].category;
		timestamp = data[i].timestamp;

		/*====================================*/
		//console.log(data[i].collaboration);
		var eventCollaboration = data[i].collaboration.collaborator;
		for(var keys in eventCollaboration){
			var innerEventCollab = eventCollaboration[keys];
			console.log(innerEventCollab.organizer_name)
		}
		/*====================================*/
		//console.log(data[i].participation);
		/*====================================*/
		//console.log(data[i].reward);
		/*====================================*/
		//console.log(data[i].survey);

		/*===================================*/
		drawCollabPost(eventKey, eventAdd, eventPic, eventDesc, eventSDate, eventEDate, organizerName, organizerPic, organizerCate, timestamp);
	}
}

function drawCollabPost(eventKey, eventAdd, eventPic, eventDesc, eventSDate, eventEDate, organizerName, organizerPic, organizerCate, timestamp){
	//console.log(eventKey);
	//console.log(eventDesc);
	var imageDiv = eventPic;
	var imageDivInput = "";
	if(imageDiv=="dummy"){
		imageDivInput = '<div class="row" style="margin-left:-30px; margin-right:-30px;"><div class="container-fluid" style="display:none"></div></div>';
	}else{
		imageDivInput = '<div class="row" style="margin-left:-30px; margin-right:-30px;"><div class="container-fluid"><img src="'+eventPic+'" class="img-responsive" style="width=100%;" alt="Image"></div></div>';
	}

	var drawCollab = document.getElementById("myCollabField");
	/*drawCollab.innerHTML += '<div class="col-sm-4" id="'+eventKey+'" style="max-width:300px; min-width:300px; margin-top:20px;">'
							+ '<div class="panel panel-primary" style="box-shadow: 10px 10px 10px #888888;">'
							+ '<div class="panel-body">'
							+ '<div class="container-fluid">'
							+ '<div class="row">'     
							+ '<div class="col-xs-12 col-sm-12"><button id ="'+eventKey+'" data-container="body" data-id="'+eventKey+'" class="btn btn-primary pull-right confirmation-callback" data-toggle="confirmation"  data-on-confirm="deletePanel" data-placement="bottom" data-popout="true" data-singleton="true"><span class="glyphicon glyphicon-trash fa-lg"></span></button></div>'
							+ '<div id="dialog-confirm"></div>'
							+ '<div class="row clearfix">'
							+ '<div class="col-xs-2 col-sm-2">'
							+ '<div style="display:inline-block;vertical-align:top;">'
							+ '<img src="'+organizerPic+'" style="width:50px; height:50px;" alt="profileImage"/>'
							+ '</div></div>'
							+ '<div class="col-xs-10 col-sm-10">'
							+ '<div style="display:inline-block; margin-left:10px;">'
							+ '<h4 style="font-size:13px; margin-top:5px; margin-bottom:-1px;">'+organizerName+'</h4>'
							+ '<span style="font-size:11px;">'+eventAdd+'</span>'
							+ '<h6 style="font-size:9px; margin-top:3px;">'+Converttimestamp(timestamp)+'</h6></div></div></div>'
							+ '<div class="row">'
							+ '<div class="container-fluid">'
							+ '<div class="col-md-12">'
							+ '<h4 style="font-size:12px;">'+eventDesc+'</h4>'
							+ '</div></div></div>'
							+ imageDivInput
							+ '<div class="row">'
							+ '</div><div class="row" style="margin-top:10px;background-color:#ffcccc; padding:10px;">'
							+ '<h5 style="margin-top:5px; margin-bottom:-2px;"><strong>Start Date: </strong>'+eventSDate+'</h5>'
							+ '<h5 style="margin-top:5px; margin-bottom:-2px;"><strong>End Date: </strong>'+eventEDate+'</h5></div><br>'
							+ '<div class="row" id="moreDetails"><a style="color:white;"><center>More Details</center></a></div><br>'
							+ '<div class="row"><button class="btn btn-primary form-control" data-toggle="modal" data-target="#myModal" onclick="GenerateQR(\''+eventKey+'\')">Generate QR <span class="glyphicon glyphicon-qrcode"></span></button></div>'
							+ '</div></div></div></div>';*/

		drawCollab.innerHTML += '<div class="container-fluid" style="border-radius:5px; background-color:#fff7f7 	; box-shadow: 1px 0px 3px #888888; margin:10px;">'
							  	+ '<div class="row">'
							  		+ '<div class="col-12 col-sm-12 col-md-4 col-lg-4">'
							  			+ '<div class="container-fluid" align="middle" style="border-radius:5px; background-color: white; box-shadow: 1px 1px 10px #888888; margin:10px;">'
											+ imageDivInput
											+ '<div class="container-fluid" vertical-align="middle"><h4 style="font-size:12px;">'+eventDesc+'</h4></div>'
										+ '</div>'
							  		+ '</div>'
							  		/*==============================*/
							  		+ '<div class="col-12 col-sm-12 col-md-8 col-lg-8">'
							  			+ '<div class="container-fluid" style="border-radius:5px; border-style:solid; border-width:1px;  margin:10px;">'
							  				+ '<div class="row" style="margin:10px;">'
							  					+ '<h5><strong>Event Details: </strong></h5>'
												+ '<div class="col-2 col-sm-2 col-md-2 col-lg-2">'
													+ '<img src="'+organizerPic+'" style="width:50px; height:50px;" alt="profileImage"/>'
												+ '</div>'
												+ '<div class="col-10 col-sm-10 col-md-10 col-lg-10">'
													+ '<h4 style="font-size:13px; margin-top:5px; margin-bottom:-1px;">'+organizerName+'</h4>'
													+ '<span style="font-size:11px;">'+eventAdd+'</span>'
													+ '<h6 style="font-size:9px; margin-top:3px;">'+Converttimestamp(timestamp)+'</h6>'
												+ '</div>'
											+ '</div>'
											+ '<h6 style="font-size:13px;"><strong>Start Date: </strong>'+eventSDate+'</h6>'
											+ '<h6 style="font-size:13px;"><strong>End Date: </strong>'+eventEDate+'</h6>'
							  			+ '</div>'
							  			/*============================*/
							  			+ '<div class="container-fluid" style="border-radius:5px; border-style:solid; border-width:1px;  margin:10px;">'
							  				+ 'Collaborators'
							  			+ '</div>'
							  			/*============================*/
							  			+ '<div class="container-fluid" style="border-radius:5px; border-style:solid; border-width:1px;  margin:10px;">'
							  				+ 'Tickets'
							  			+ '</div>'
							  			/*===========================*/
							  			+ '<div class="container-fluid" style="border-radius:5px; border-style:solid; border-width:1px;  margin:10px;">'
							  				+ 'Rewards'
							  			+ '</div>'
							  		+ '</div>'
							  	+ '</div>'
							  + '</div>';
	$("#loadercontainerCollab").hide();
}
