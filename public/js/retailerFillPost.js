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
		        	var organizerName = document.getElementById("shopName").innerHTML;
		        	console.log("test");
		        	console.log(data);
		        	console.log(data.organizer_events);
		        	var myEvent = data.organizer_events;
		        	if(myEvent != "no event")
		        	{
		        		for(var keyss in myEvent){
		        		var currentOrganizer = myEvent[keyss].organizer_name;
		        		if(currentOrganizer == organizerName){
		        			console.log("events here");
		        			drawMyEvent(myEvent);
			        	}else{
			        		console.log("other events");
			        		console.log(myEvent);
			        	}
		        		}
		        	}
		        	else
		        	{
		        		console.log("database no events");
		        	}


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
			      		console.log("no event collaboration");
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

	   		//get public events
	   		$.ajax({
		        url: window.location.href + "/getDataPublic",
		        type: 'POST',
		        success: function(data) {
			      	if(data.public_events == "no event")
			      	{
			      		console.log("no public event");
			      	}
			      	else
			      	{
			      		console.log("public event");
			      		console.log(data.public_events);
			      		var allevents = data.public_events;
			      		drawExplorePost(allevents);
			      		/*for(var keys in allevents){
			      			console.log(allevents[keys]);
			      			drawExplorePost(allevents[keys]);
			      		}*/
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
function GenerateQR(key, qrcheck ,rkey)
{
	var typeNumber = 4;
			var errorCorrectionLevel = 'L';
			var qr = qrcode(typeNumber, errorCorrectionLevel);
			qr.addData(key+","+qrcheck+","+rkey);
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

/*21/10/2017 -josh- my event preview*/
/*last update 27/10/2017*/
function drawMyEvent(myEvent){
	//console.log(myEvent);
	var getEventData = myEvent;
	var postField = document.getElementById("myPostField");
	postField.innerHTML = "";
	for(var keys in getEventData){
		var eventKey = getEventData[keys].event_key;
		var eventadd = getEventData[keys].address;
		var eventTitle = getEventData[keys].event_title;
		var eventdesc =  getEventData[keys].description;
		var eventpic = getEventData[keys].event_picture;
		var eventSDate = getEventData[keys].start_date;
		var eventEDate = getEventData[keys].end_date;
		var organizerKey = getEventData[keys].organizer_key;
		var orgName = getEventData[keys].organizer_name;
		var orgPic = getEventData[keys].organizer_pic;
		var timestamp = getEventData[keys].timestamp;
		var collaboration = getEventData[keys].collaboration;
		var collaborationPost = getEventData[keys].collaborator_post;
		var participation = getEventData[keys].participation;
		var purchased = getEventData[keys].purchase;
		var rewards = getEventData[keys].reward;
		var qrcheck = getEventData[keys].qr_check;

		var eventCollaboration = collaboration.collaborator;

		var eventParticipate = participation.participate;
		var eventTicket = participation.tickets;
		
		var participationPoint = rewards.reward_point;
		var participationTNC = rewards.term_condition;

		var imageDiv = eventpic;
		var imageDivInput = "";
		if(imageDiv=="dummy"){
			imageDivInput = '<div class="row" style="margin-left:-30px; margin-right:-30px;"><div class="container-fluid" style="height:250px;"></div></div>';
		}else{
			imageDivInput = '<div class="row" style="margin-left:-30px; margin-right:-30px; margin-bottom:20px;"><div class="container-fluid" align="center"><img src="'+eventpic+'" class="img-responsive" style="width:100%; height:auto" alt="Image"></div></div>';
		}

		
		postField.innerHTML += '<div class="container-fluid" id="'+eventKey+'" style="border-radius:5px; box-shadow: 1px 0px 3px #888888; background-color:white; margin-top:10px; margin-bottom:30px;">'
							  	+ '<div class="row">'
							  		+ '<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">'
							  			+ '<div class="container-fluid" style="border-radius:5px; background-color: white; margin:10px;">'
							  				+ '<div class="row" style="margin-top: 10px;">'
							  					+ '<div class="col-xs-2 col-sm-2">'
												+ '<div style="display:inline-block;vertical-align:top;">'
												+ '<img src="'+orgPic+'" style="width:50px; height:50px;" alt="profileImage"/>'
												+ '</div></div>'
												+ '<div class="col-xs-10 col-sm-10">'
												+ '<div style="display:inline-block;">'
												+ '<h4 style="font-size:13px; margin-left:20px; margin-top:0px; margin-bottom:-8px;">'+orgName+'</h4>'
												+ '<h6 style="font-size:10px; margin-left:20px;"><strong>Located @ </strong><a>'+eventadd+'</a></h6>'
												+ '<h6 class="pull-right" style="font-size:9px; color:grey; margin-top:-8px;">Posted '+Converttimestamp(timestamp)+'</h6>'
												+ '</div></div></div>'
												+ '<h5 style="margin-top:5px; margin-bottom:-5px"><strong>'+eventTitle+'</strong></h5>'
												+ '<h6>'+eventdesc+'</h6>'
												+ imageDivInput
												
												+ '<div class="row" align="center" id="btnEvent_'+eventKey+'"><a class="btn btn-primary" style="margin-bottom:20px;" id="evt_'+eventKey+'" data-toggle="modal" data-target="#myModal" onclick="GenerateQR(\''+eventKey+'\',\''+qrcheck+'\',\''+organizerKey+'\')">Generate QR <span class="glyphicon glyphicon-qrcode"></span></a></div>'
										+ '</div>'
							  		+ '</div>'
							  		
							  	/*border-radius: 5px 5px 0px 0px; */
							  		
							  		+ '<div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">'
							  			+ '<div class="scrollbar" id="style-2" style="overflow-y: scroll; height:450px; force-overflow; margin-top:10px;">'
							  				+ '<div class="container-fluid" style="border-radius:5px; margin-left:10px;">'
							  					+ '<div class="row" style="background-color:#819fa8; color:white; padding-top:10px; padding-bottom:10px; text-align:center"><h4>Event Information</h4></div>'
									  				+ '<div class="row" style="margin:10px;">'
														+ '<img src="'+orgPic+'" style="width:80px; height:80px;" alt="profileImage"/>'
														+ '<h4 style="font-size:13px; margin-top:5px; margin-bottom:-1px;"><strong>Organizer: </strong>'+orgName+'</h4>'
														+ '<h4 style="font-size:13px;"><strong>Event Location: </strong>'+eventadd+'</h4>'
														+ '<h4 style="font-size:13px; margin-top:3px;"><strong>Event posted </strong>'+Converttimestamp(timestamp)+'</h4>'
														+ '<h4 style="font-size:13px; margin-top:3px;"><strong>Event starts: </strong>'+eventSDate+'</h4>'
														+ '<h4 style="font-size:13px; margin-top:3px;"><strong>Event ends: </strong>'+eventEDate+'</h4>'
													+ '</div>'

									  				+ '<div class="row" style="margin-top:15px;"><h4 style="color:#819fa8; margin-left:10px;">Collaborators</h4>'
									  				+ '<div class="container-fluid" align="center" id="viewCollaborators_'+eventKey+'" style="background-color:white; margin-left:10px;"></div></div>'
							  			
									  				+ '<div class="row" style="background-color:#c7dae0; margin-top:15px;"><h4 style="color:white;  margin-left:10px;">Tickets/</h4>'
							  						+ '<div class="container-fluid" id="ticketField_'+eventKey+'" style="	"></div></div>'

							  						+ '<div class="row" style="margin-top:15px;"><h4 style="color:#819fa8; margin-left:10px;">Rewards</h4></div>'
							  						+ '<div class="container-fluid">'
							  							+ '<label>Participation Points: </label><p>'+participationPoint+'</p>'
								  						+ '<label>Terms and Condition: </label><p>'+participationTNC+'</p>'
								  						+ '<div class="container-fluid" id="rewardField_'+eventKey+'" align="center" style="background-color:white;">'
								  							+ ''
								  						+ '</div>'
								  					+ '</div>'

							  						+ '<div class="row" style="background-color:#c7dae0; color:white; margin-top:15px;"><h4 style="color:white;  margin-left:10px;">Sub Events</h4>'
							  						+ '<div class="container-fluid" id="subeventContainer_'+eventKey+'" style="margin-bottom:50px;"></div></div'
											+ '</div>'
							  			+ '</div>'
							  		+ '</div>'
							  	+ '</div>'
							  + '</div>';


		var collabView = document.getElementById("viewCollaborators_"+eventKey);
		collabView.innerHTML = "";
		for(var keys in eventCollaboration){
			var innerEventCollab = eventCollaboration[keys];
			var collabStatus = eventCollaboration[keys].status;
			if(collabStatus == "accepted"){
				collabView.innerHTML += '<abbr title="'+innerEventCollab.organizer_name+'"><img src="'+innerEventCollab.organizer_pic+'" style="border-radius:50%; width:60px; height:60px; margin:15px; box-shadow: inset 3px 3px 10px #000000;"/></abbr>';
			}
		}

		var ticketField = document.getElementById("ticketField_"+eventKey);
		//console.log(ticketField);
		if(eventParticipate == "on"){
			//var eventParticipation = eventTicket;
			ticketField.innerHTML = "";
			for(var keys in eventTicket){
				var ticketNum = eventTicket[keys].available_ticket;
				var ticketDesc = eventTicket[keys].ticket_description;
				var ticketEDate = eventTicket[keys].ticket_end_date;
				var ticketPrice = eventTicket[keys].ticket_price;
				var ticketSDate = eventTicket[keys].ticket_start_date;
				var ticketTitle = eventTicket[keys].ticket_title;
				var ticketType = eventTicket[keys].ticket_type;
				//console.log(ticketNum);

				ticketField.innerHTML	+= '<div class="container-fluid" style="max-width: 90%; border-radius: 5px; background-color: #f2f2f2; box-shadow: 1px 1px 3px #7a7a7a; margin-bottom:15px; margin-top:15px">'
		  								 + '<h5><strong>'+ticketTitle+'</strong></h5>'
		  								 + '<h6><strong>Ticket type: </strong>'+ticketType+'</h6>'
		  								 + '<div class="row" style="background-color: #383838">'
		  								 + '<div class="container-fluid"><h6 style="color:white">'+ticketDesc+'</h6></div></div>'
		  								 + '<h6><strong>Available Ticket/s: </strong>'+ticketNum+'</h6>'
		  								 + '<h6><strong>Ticket Price: </strong>'+ticketPrice+'</h6>';
			}
		}


		var rewardCost;
		var rewardDesc;
		var rewardName;
		var rewardPic;

		var rewardArea = document.getElementById("rewardField_"+eventKey);

		if(rewards.rewardsystem == "on"){
			var innerReward = rewards.rewards;
			rewardArea.innerHTML = "";
			for(var keys in innerReward){
				rewardCost = innerReward[keys].reward_cost;
				rewardDesc = innerReward[keys].reward_description;
				rewardName = innerReward[keys].reward_name;
				rewardPic = innerReward[keys].reward_pic;

				/*rewardArea.innerHTML += '<div class="container-fluid" style="border-radius:5px; background-color:#f2f2f2; box-shadow: 1px 1px 5px #7a7a7a; margin:10px;">'
									  	+ '<h6><strong>'+rewardName+'</strong></h6>'
									  	+ '<h6>'+rewardDesc+'</h6>'
									  	+ '<div class="row">'
									  		+ '<img src="'+rewardPic+'" class="img-responsive" style="width:auto; height:auto" alt="Image">'
									  	+ '</div>'
									  	+ '<h6><strong>Cost: </strong>'+rewardCost+'</h6>'	
									  + '</div>';*/
				rewardArea.innerHTML += '<img src="'+rewardPic+'" style="border-radius:50%; width:60px; height:60px; margin:15px; box-shadow: inset 3px 3px 10px 0 #000000;"/>'
			}
		}

		if(collaboration.collaborate == "on"){
			var collabPost = collaborationPost;
			if(collabPost == undefined){
				var contents = document.getElementById("subeventContainer_"+eventKey);
				contents.innerHTML = '<div class="container-fluid"><h4>No sub events yet</h4></div>';
			}else{
				var contents = document.getElementById("subeventContainer_"+eventKey);
				contents.innerHTML = '<div class="container-fluid"><h4>No sub events yet</h4></div>';
				console.log(collabPost);
			}
		}

		$("#loadercontainerPost").slideUp();
	}
}

/* 16/10/2017 - josh - collaborated event */
/*Last update 27/10/2017*/
function drawCollaboratedEvent(data){
	//console.log(data);
	//console.log(data.length);

	var eventKey;
	var eventAdd;
	var eventPic;
	var eventDesc;
	var eventTitle;
	var eventSDate;
	var eventEDate;
	var organizerKey;
	var organizerName;
	var organizerPic;
	var organizerCate;
	var timestamp;

	for(var i=0; i<data.length; i++){
		eventAdd = data[i].address;
		 
		eventKey = data[i].event_key;
		eventAdd = data[i].address;
		eventPic = data[i].event_picture;
		eventTitle = data[i].event_title;
		eventDesc = data[i].description;
		eventSDate = data[i].start_date;
		eventEDate = data[i].end_date;
		organizerName = data[i].organizer_name;
		organizerPic = data[i].organizer_pic;
		organizerCate = data[i].category;
		timestamp = data[i].timestamp;

		console.log(data[i]);
		/*====================================*/
		//console.log(data[i].collaboration);
		var eventCollaboration = data[i].collaboration.collaborator;
		/*====================================*/
		var eventParticipate = data[i].participation.participate;
		//console.log("test -" + data[i].participation.tickets);
		var eventTicket = data[i].participation.tickets;
		/*====================================*/
		//console.log(data[i].reward);
		var eventReward = data[i].reward;
		
		/*====================================*/
		//console.log(data[i].survey);

		/*===================================*/
		var collaboration = data[i].collaboration; 
		var collaborationPost = data[i].collaborator_post;
		/*===================================*/		
		drawCollabPost(eventKey, eventAdd, eventPic, eventTitle, eventDesc, eventSDate, eventEDate, organizerName, organizerPic, organizerCate, timestamp, eventCollaboration, eventTicket, eventParticipate, eventReward, collaboration, collaborationPost);
	}
}

function drawCollabPost(eventKey, eventAdd, eventPic, eventTitle, eventDesc, eventSDate, eventEDate, organizerName, organizerPic, organizerCate, timestamp, eventCollaboration, eventTicket, eventParticipate, eventReward, collaboration, collaborationPost){
	//console.log(eventKey);
	//console.log(eventDesc);
	var imageDiv = eventPic;
	var imageDivInput = "";
	if(imageDiv=="dummy"){
		imageDivInput = '<div class="row" style="margin-left:-30px; margin-right:-30px;"><div class="container-fluid"></div></div>';
	}else{
		imageDivInput = '<div class="row" style="margin-left:-30px; margin-right:-30px;"><div class="container-fluid" align="center"><img src="'+eventPic+'" class="img-responsive" style="width:100%; height:auto;" alt="Image"></div></div>';
	}

	var participationPoint = eventReward.reward_point;
	var participationTNC = eventReward.term_condition;

	var drawCollab = document.getElementById("myCollabField");
		drawCollab.innerHTML += '<div class="container-fluid" style="border-radius:5px; box-shadow: 1px 0px 3px #888888; background-color:white; margin-top:10px; margin-bottom:30px;">'
							  	+ '<div class="row">'
							  		+ '<div class="col-12 col-sm-12 col-md-4 col-lg-4">'
							  			+ '<div class="container-fluid" style="border-radius:5px; background-color: white; margin:10px;">'
							  				+ '<div class="row" style="margin-top: 10px;">'
							  					+ '<div class="col-xs-2 col-sm-2">'
												+ '<div style="display:inline-block;vertical-align:top;">'
												+ '<img src="'+organizerPic+'" style="width:50px; height:50px;" alt="profileImage"/>'
												+ '</div></div>'
												+ '<div class="col-xs-10 col-sm-10">'
												+ '<div style="display:inline-block;">'
												+ '<h4 style="font-size:13px; margin-left:20px; margin-top:0px; margin-bottom:-8px;">'+organizerName+'</h4>'
												+ '<h6 style="font-size:10px; margin-left:20px;"><strong>Located @ </strong><a>'+eventAdd+'</a></h6>'
												+ '<h6 class="pull-right" style="font-size:9px; color:grey; margin-top:-8px;">Posted '+Converttimestamp(timestamp)+'</h6>'
												+ '</div></div></div>'
												+ '<h5 style="margin-top:5px; margin-bottom:-5px"><strong>'+eventTitle+'</strong></h5>'
												+ '<h6>'+eventDesc+'</h6>'
												+ imageDivInput
												+ '<div align="center" style="margin-bottom:20px; margin-top:20px;"><a class="btn btn-success" data-toggle="modal" data-target="#subEvent" onclick="postSubEvent(\''+eventKey+'\', \''+organizerName+'\')" style="margin-bottom:10px;">Post Sub Event</a></div>'
										+ '</div>'
							  		+ '</div>'
							  	
							  	/*border-radius: 5px 5px 0px 0px; */
							  		
							  		+ '<div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">'
							  			+ '<div class="scrollbar" id="style-2" style="overflow-y: scroll; height:450px; force-overflow;">'
							  				+ '<div class="container-fluid" style="border-radius:5px;">'
							  					+ '<div class="row" style="background-color:#819fa8; color:white; padding-top:10px; padding-bottom:10px; text-align:center"><h4><strong>Event Information</strong></h4></div>'
									  				+ '<div class="row" style="margin:10px;">'
														+ '<img src="'+organizerPic+'" style="width:80px; height:80px;" alt="profileImage"/>'
														+ '<h4 style="font-size:13px; margin-top:5px; margin-bottom:-1px;"><strong>Organizer: </strong>'+organizerName+'</h4>'
														+ '<h4 style="font-size:13px;"><strong>Event Location: </strong>'+eventAdd+'</h4>'
														+ '<h4 style="font-size:13px; margin-top:3px;"><strong>Event posted </strong>'+Converttimestamp(timestamp)+'</h4>'
														+ '<h4 style="font-size:13px; margin-top:3px;"><strong>Event starts: </strong>'+eventSDate+'</h4>'
														+ '<h4 style="font-size:13px; margin-top:3px;"><strong>Event ends  : </strong>'+eventEDate+'</h4>'
													+ '</div>'

									  				+ '<div class="row" style="margin-top:15px;"><h4 style="color:#819fa8;">Collaborators</h4>'
									  				+ '<div class="container-fluid" align="center" id="viewCollaborators_'+eventKey+'" style="background-color:white; margin-left:10px;"></div></div>'
							  			
									  				+ '<div class="row" style="background-color:#819fa8; margin-top:15px;"><h4 style="color:white;  margin-left:10px;">Tickets/</h4>'
							  						+ '<div class="container-fluid" id="ticketField_'+eventKey+'" style="	"></div></div>'

							  						+ '<div class="row" style="margin-top:15px;"><h4 style="color:#819fa8;; margin-left:10px;">Rewards</h4></div>'
							  						+ '<div class="container-fluid">'
							  							+ '<label>Participation Points: </label><p>'+participationPoint+'</p>'
								  						+ '<label>Terms and Condition: </label><p>'+participationTNC+'</p>'
								  						+ '<div class="container-fluid" id="rewardField_'+eventKey+'" align="center" style="background-color:white;">'
								  						+ '</div>'
								  					+ '</div>'

							  						+ '<div class="row" style="background-color:#819fa8; color:white; margin-top:15px;"><h4 style="color:white;  margin-left:10px;">Sub Events</h4>'
							  						+ '<div class="container-fluid" id="subeventcontainer_'+eventKey+'" style="margin-bottom:50px;"></div></div'
											+ '</div>'
							  			+ '</div>'
							  		+ '</div>'
							  	+ '</div>'
							  + '</div>';

		var collabView = document.getElementById("viewCollaborators_"+eventKey);
		collabView.innerHTML = "";
		for(var keys in eventCollaboration){
			var innerEventCollab = eventCollaboration[keys];
			var collabStatus = eventCollaboration[keys].status;
			if(collabStatus == "accepted"){
				collabView.innerHTML += '<abbr title="'+innerEventCollab.organizer_name+'"><img src="'+innerEventCollab.organizer_pic+'" style="border-radius:50%; width:60px; height:60px; margin:15px; box-shadow: inset 3px 3px 10px 0 #000000;"/></abbr>';
			}
		}
		
		//drawTicket(eventTicket, eventParticipate);
		var ticketField = document.getElementById("ticketField_"+eventKey);
		//console.log(ticketField);
		if(eventParticipate == "on"){
			//var eventParticipation = eventTicket;
			ticketField.innerHTML = "";
			for(var keys in eventTicket){
				var ticketNum = eventTicket[keys].available_ticket;
				var ticketDesc = eventTicket[keys].ticket_description;
				var ticketEDate = eventTicket[keys].ticket_end_date;
				var ticketPrice = eventTicket[keys].ticket_price;
				var ticketSDate = eventTicket[keys].ticket_start_date;
				var ticketTitle = eventTicket[keys].ticket_title;
				var ticketType = eventTicket[keys].ticket_type;
				//console.log(ticketNum);

				ticketField.innerHTML	+= '<div class="container-fluid" style="max-width: 90%; border-radius: 5px; background-color: #f2f2f2; box-shadow: 1px 1px 3px #7a7a7a; margin-bottom:15px; margin-top:15px">'
		  								 + '<h5 style="text-align:center"><strong>'+ticketTitle+'</strong></h5>'
		  								 + '<h6><strong>Ticket type/ </strong>'+ticketType+'</h6>'
		  								 + '<div class="row" style="background-color: #383838">'
		  								 + '<div class="container-fluid"><h6 style="color:white">Description/ '+ticketDesc+'</h6></div></div>'
		  								 + '<h6><strong>Available Ticket/s: </strong>'+ticketNum+'</h6>'
		  								 + '<button class="pull-right btn btn-primary" style="margin-bottom:20px; padding:10px" disabled><strong>RM </strong>'+ticketPrice+'</button>';
			}
		}

		var rewardCost;
		var rewardDesc;
		var rewardName;
		var rewardPic;

		var rewardArea = document.getElementById("rewardField_"+eventKey);

		if(eventReward.rewardsystem == "on"){
			var innerReward = eventReward.rewards;
			for(var keys in innerReward){
				rewardCost = innerReward[keys].reward_cost;
				rewardDesc = innerReward[keys].reward_description;
				rewardName = innerReward[keys].reward_name;
				rewardPic = innerReward[keys].reward_pic;

				/*rewardArea.innerHTML += '<div class="container-fluid" style="border-radius:5px; background-color:#f2f2f2; box-shadow: 1px 1px 5px #7a7a7a; margin:10px;">'
									  	+ '<h6><strong>'+rewardName+'</strong></h6>'
									  	+ '<h6>'+rewardDesc+'</h6>'
									  	+ '<div class="row">'
									  		+ '<img src="'+rewardPic+'" class="img-responsive" style="width:auto; height:auto" alt="Image">'
									  	+ '</div>'
									  	+ '<h6><strong>Cost: </strong>'+rewardCost+'</h6>'	
									  + '</div>';*/

				rewardArea.innerHTML += '<img src="'+rewardPic+'" style="border-radius:50%; width:60px; height:60px; margin:15px; box-shadow: inset 3px 3px 10px 0 #000000;"/>'
			}
		}

		if(collaboration.collaborate == "on"){
			var collabPost = collaborationPost;
			if(collabPost == undefined){
				var contents = document.getElementById("subeventcontainer_"+eventKey);
				contents.innerHTML = '<div class="container-fluid"><h4>No sub events yet</h4></div>';
			}else{
				console.log(collabPost);
			}
		}
	$("#loadercontainerCollab").hide();
}


function drawExplorePost(myEvent){
	//console.log(myEvent);
	var getEventData = myEvent;
	var postField = document.getElementById("myExploreField");
	postField.innerHTML = "";
	for(var keys in getEventData){
		var eventKey = getEventData[keys].event_key;
		var eventadd = getEventData[keys].address;
		var eventTitle = getEventData[keys].event_title;
		var eventdesc =  getEventData[keys].description;
		var eventpic = getEventData[keys].event_picture;
		var eventSDate = getEventData[keys].start_date;
		var eventEDate = getEventData[keys].end_date;
		var organizerKey = getEventData[keys].organizer_key;
		var orgName = getEventData[keys].organizer_name;
		var orgPic = getEventData[keys].organizer_pic;
		var timestamp = getEventData[keys].timestamp;
		var collaboration = getEventData[keys].collaboration;
		var collaborationPost = getEventData[keys].collaborator_post;
		var participation = getEventData[keys].participation;
		var purchased = getEventData[keys].purchase;
		var rewards = getEventData[keys].reward;
		var qrcheck = getEventData[keys].qr_check;

		var eventCollaboration = collaboration.collaborator;

		var eventParticipate = participation.participate;
		var eventTicket = participation.tickets;
		
		var participationPoint = rewards.reward_point;
		var participationTNC = rewards.term_condition;

		var organizerName = document.getElementById("shopName").innerHTML;

		var imageDiv = eventpic;
		var imageDivInput = "";
		if(imageDiv=="dummy"){
			imageDivInput = '<div class="row" style="margin-left:-30px; margin-right:-30px;"><div class="container-fluid" style="height:250px;"></div></div>';
		}else{
			imageDivInput = '<div class="row" style="margin-left:-30px; margin-right:-30px; margin-bottom:20px;"><div class="container-fluid" align="center"><img src="'+eventpic+'" class="img-responsive" style="width:100%; height:auto" alt="Image"></div></div>';
		}

		
		postField.innerHTML += '<div class="container-fluid" id="'+eventKey+'" style="border-radius:5px; box-shadow: 1px 0px 3px #888888; background-color:white; margin-top:10px; margin-bottom:30px;">'
							  	+ '<div class="row">'
							  		+ '<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">'
							  			+ '<div class="container-fluid" style="border-radius:5px; background-color: white; margin:10px;">'
							  				+ '<div class="row" style="margin-top: 10px;">'
							  					+ '<div class="col-xs-2 col-sm-2">'
												+ '<div style="display:inline-block;vertical-align:top;">'
												+ '<img src="'+orgPic+'" style="width:50px; height:50px;" alt="profileImage"/>'
												+ '</div></div>'
												+ '<div class="col-xs-10 col-sm-10">'
												+ '<div style="display:inline-block;">'
												+ '<h4 style="font-size:13px; margin-left:20px; margin-top:0px; margin-bottom:-8px;">'+orgName+'</h4>'
												+ '<h6 style="font-size:10px; margin-left:20px;"><strong>Located @ </strong><a>'+eventadd+'</a></h6>'
												+ '<h6 class="pull-right" style="font-size:9px; color:grey; margin-top:-8px;">Posted '+Converttimestamp(timestamp)+'</h6>'
												+ '</div></div></div>'
												+ '<h5 style="margin-top:5px; margin-bottom:-5px"><strong>'+eventTitle+'</strong></h5>'
												+ '<h6>'+eventdesc+'</h6>'
												+ imageDivInput
																																																																	
												+ '<div class="row" align="center" id="btnEvent_'+eventKey+'"><a class="btn btn-primary" style="margin-bottom:20px;" id="evt_'+eventKey+'" data-toggle="modal" data-target="#viewSubCollab" onclick="buttonInput(\''+eventKey+'\', \''+orgName+'\', \''+eventEDate+'\')">Join Event</a></div>'
										+ '</div>'
							  		+ '</div>'
							  		
							  	/*border-radius: 5px 5px 0px 0px; */
							  		
							  		+ '<div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">'
							  			+ '<div class="scrollbar" id="style-2" style="overflow-y: scroll; height:450px; force-overflow; margin-top:10px;">'
							  				+ '<div class="container-fluid" style="border-radius:5px; margin-left:10px;">'
							  					+ '<div class="row" style="background-color:#819fa8; color:white; padding-top:10px; padding-bottom:10px; text-align:center"><h4>Event Information</h4></div>'
									  				+ '<div class="row" style="margin:10px;">'
														+ '<img src="'+orgPic+'" style="width:80px; height:80px;" alt="profileImage"/>'
														+ '<h4 style="font-size:13px; margin-top:5px; margin-bottom:-1px;"><strong>Organizer: </strong>'+orgName+'</h4>'
														+ '<h4 style="font-size:13px;"><strong>Event Location: </strong>'+eventadd+'</h4>'
														+ '<h4 style="font-size:13px; margin-top:3px;"><strong>Event posted </strong>'+Converttimestamp(timestamp)+'</h4>'
														+ '<h4 style="font-size:13px; margin-top:3px;"><strong>Event starts: </strong>'+eventSDate+'</h4>'
														+ '<h4 style="font-size:13px; margin-top:3px;"><strong>Event ends: </strong>'+eventEDate+'</h4>'
													+ '</div>'

									  				+ '<div class="row" style="margin-top:15px;"><h4 style="color:#819fa8; margin-left:10px;">Collaborators</h4>'
									  				+ '<div class="container-fluid" align="center" id="viewExCollaborators_'+eventKey+'" style="background-color:white; margin-left:10px;"></div></div>'
							  			
									  				+ '<div class="row" style="background-color:#c7dae0; margin-top:15px;"><h4 style="color:white;  margin-left:10px;">Tickets/</h4>'
							  						+ '<div class="container-fluid" id="exticketField_'+eventKey+'" style="	"></div></div>'

							  						+ '<div class="row" style="margin-top:15px;"><h4 style="color:#819fa8; margin-left:10px;">Rewards</h4></div>'
							  						+ '<div class="container-fluid">'
							  							+ '<label>Participation Points: </label><p>'+participationPoint+'</p>'
								  						+ '<label>Terms and Condition: </label><p>'+participationTNC+'</p>'
								  						+ '<div class="container-fluid" id="exrewardField_'+eventKey+'" align="center" style="background-color:white;">'
								  							+ ''
								  						+ '</div>'
								  					+ '</div>'

							  						+ '<div class="row" style="background-color:#c7dae0; color:white; margin-top:15px;"><h4 style="color:white;  margin-left:10px;">Sub Events</h4>'
							  						+ '<div class="container-fluid" id="exsubeventContainer_'+eventKey+'" style="margin-bottom:50px;"></div></div'
											+ '</div>'
							  			+ '</div>'
							  		+ '</div>'
							  	+ '</div>'
							  + '</div>';


		var collabView = document.getElementById("viewExCollaborators_"+eventKey);
		collabView.innerHTML = "";
		for(var keys in eventCollaboration){
			var innerEventCollab = eventCollaboration[keys];
			var collabStatus = eventCollaboration[keys].status;
			if(collabStatus == "accepted"){
				collabView.innerHTML += '<abbr title="'+innerEventCollab.organizer_name+'"><img src="'+innerEventCollab.organizer_pic+'" style="border-radius:50%; width:60px; height:60px; margin:15px; box-shadow: inset 3px 3px 10px #000000;"/></abbr>';
			}
		}

		var ticketField = document.getElementById("exticketField_"+eventKey);
		//console.log(ticketField);
		if(eventParticipate == "on"){
			//var eventParticipation = eventTicket;
			ticketField.innerHTML = "";
			for(var keys in eventTicket){
				var ticketNum = eventTicket[keys].available_ticket;
				var ticketDesc = eventTicket[keys].ticket_description;
				var ticketEDate = eventTicket[keys].ticket_end_date;
				var ticketPrice = eventTicket[keys].ticket_price;
				var ticketSDate = eventTicket[keys].ticket_start_date;
				var ticketTitle = eventTicket[keys].ticket_title;
				var ticketType = eventTicket[keys].ticket_type;
				//console.log(ticketNum);

				ticketField.innerHTML	+= '<div class="container-fluid" style="max-width: 90%; border-radius: 5px; background-color: #f2f2f2; box-shadow: 1px 1px 3px #7a7a7a; margin-bottom:15px; margin-top:15px">'
		  								 + '<h5><strong>'+ticketTitle+'</strong></h5>'
		  								 + '<h6><strong>Ticket type: </strong>'+ticketType+'</h6>'
		  								 + '<div class="row" style="background-color: #383838">'
		  								 + '<div class="container-fluid"><h6 style="color:white">'+ticketDesc+'</h6></div></div>'
		  								 + '<h6><strong>Available Ticket/s: </strong>'+ticketNum+'</h6>'
		  								 + '<h6><strong>Ticket Price: </strong>'+ticketPrice+'</h6>';
			}
		}


		var rewardCost;
		var rewardDesc;
		var rewardName;
		var rewardPic;

		var rewardArea = document.getElementById("exrewardField_"+eventKey);

		if(rewards.rewardsystem == "on"){
			var innerReward = rewards.rewards;
			rewardArea.innerHTML = "";
			for(var keys in innerReward){
				rewardCost = innerReward[keys].reward_cost;
				rewardDesc = innerReward[keys].reward_description;
				rewardName = innerReward[keys].reward_name;
				rewardPic = innerReward[keys].reward_pic;
				rewardArea.innerHTML += '<img src="'+rewardPic+'" style="border-radius:50%; width:60px; height:60px; margin:15px; box-shadow: inset 3px 3px 10px 0 #000000;"/>'
			}
		}

		if(collaboration.collaborate == "on"){
			var collabPost = collaborationPost;
			if(collabPost == undefined){
				var contents = document.getElementById("exsubeventContainer_"+eventKey);
				contents.innerHTML = '<div class="container-fluid"><h4>No sub events yet</h4></div>';
			}else{
				var contents = document.getElementById("exsubeventContainer_"+eventKey);
				contents.innerHTML = '<div class="container-fluid"><h4>No sub events yet</h4></div>';
				console.log(collabPost);
			}
		}

		$("#loadercontainerExplore").slideUp();
	}
}

/*function drawTicket(eventTicket, eventParticipate){
	//console.log(eventParticipate);
	var ticketNum;
	var ticketDesc;
	var ticketEDate
	var ticketPrice;
	var ticketSDate;
	var ticketTitle;
	var ticketType;

	var ticketField = document.getElementById("ticketField");

		if(eventParticipate == "on"){
			var eventParticipation = eventTicket;
			for(var keys in eventParticipation){
				ticketNum = eventParticipation[keys].available_ticket;
				ticketDesc = eventParticipation[keys].ticket_description;
				ticketEDate = eventParticipation[keys].ticket_end_date;
				ticketPrice = eventParticipation[keys].ticket_price;
				ticketSDate = eventParticipation[keys].ticket_start_date;
				ticketTitle = eventParticipation[keys].ticket_title;
				ticketType = eventParticipation[keys].ticket_type;

				ticketField.innerHTML	+= '<div class="container-fluid" style="max-width: 90%; border-radius: 5px; background-color: #f2f2f2; box-shadow: 3px 3px 10px #7a7a7a; margin-bottom:15px; margin-top:15px">'
		  								 + '<h5><strong>'+ticketTitle+'</strong></h5>'
		  								 + '<h6><strong>Ticket type: </strong>'+ticketType+'</h6>'
		  								 + '<div class="row" style="background-color: #383838">'
		  								 + '<div class="container-fluid"><h6 style="color:white">'+ticketDesc+'</h6></div></div>'
		  								 + '<h6><strong>Available Ticket/s: </strong>'+ticketNum+'</h6>'
		  								 + '<h6><strong>Ticket Price: </strong>'+ticketPrice+'</h6>';
			}
		}
}*/

function buttonInput(eventKey, organizername,expdate){
	var drawBtn = document.getElementById("exploreBtn");
	drawBtn.innerHTML = "";
	drawBtn.innerHTML += '<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">'
					  	+ '<button class="form-control btn btn-warning" data-dismiss="modal">CANCEL</button></div>'
					  + '<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">'
						+ '<button class="form-control btn btn-success" id="submit_application"data-id="'+eventKey+','+organizername+','+expdate+'" onclick = "buttonSubmit()">SEND</button></div>';
}

function buttonSubmit()
{
	var event_organizer_i =  ($("#submit_application").data('id')).split(",");
	console.log(event_organizer_i);

		$.ajax({
		url: window.location.href + "/event_application",
		data: {eventKey :event_organizer_i[0] ,  organizername : event_organizer_i[1] ,expdate : event_organizer_i[2] },
		type: 'POST',
		success: function(data) {
				console.log(data.proceed);
				$('#'+event_organizer_i[0]).remove();
				$('#viewSubCollab').modal('hide');
			},
			error: function(xhr, status, error) {

			}
		});


}
function postSubEvent(eventKey, organizerName, i){
	var theButton = document.getElementById("subevent_btn");
	//getter
	var a = $('#subevent_btn').data('id'); 
	//setter
	$('#subevent_btn').data('id',eventKey + "," + organizerName + "," + i);
	//console.log("Eventkey: "+ eventKey);
	//console.log("OrganizerName: " + organizerName);


}

function buttonOnlick(eventKey,organizerName,s){
	console.log("button onclick");
}
$(document).ready(function () {
$("#subevent_form").submit(function(e) {
	var Return = true;
	   e.preventDefault();
    //Convert Array to Json Data
  	var event_organizer_i =  ($("#subevent_btn").data('id')).split(",");
  	var formData =  $(this).serialize().split("&");
    var InfoJson={};
    for(var key in formData)
    {
        InfoJson[formData[key].split("=")[0]] = formData[key].split("=")[1];   
    }
    //Convert Decode %
    for (var key in InfoJson) {
    InfoJson[key] = decodeURIComponent(InfoJson[key]);
  }

 	InfoJson["event_key"] = event_organizer_i[0];
 	InfoJson ["city"] = markerz.city;
    InfoJson ["latlng"] = markerz.position.lat() + "," + markerz.position.lng();
    delete InfoJson.AddCategory;
    console.log(InfoJson);


 	if(document.getElementById("subevent_img").files.length==0){
 		console.log("No event image ");
 	}
 	else
 	{
 		  var imageFile = document.getElementById("subevent_img").files[0];
 		var event_pic = firebase.storage().ref("Events/collaborator/"+InfoJson.organizer_name+"/"+imageFile.name).put(imageFile);
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
					url: window.location.href + "/collaboratorPost",
					data: InfoJson,
					type: 'POST',
					success: function(data) {
					    console.log(data.proceed);
					    $('#subEvent').modal('hide');
        				console.log("sss");
					    },
					error: function(xhr, status, error) {


					}
				});
		});
 	}

});

});
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

function fillInAddress(){
	   console.log("Errors");
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
      var AddLocation = document.getElementById("AddLocation");
    
    var mapss = document.getElementById("mapss");
    $(locationAdd).slideDown("slow");
    AddLocation.style.display = "none";
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
              if (componentForm[addressType]) {
                var val = place.address_components[i][componentForm[addressType]];
                    markerz.city  = val;
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
  var locationAdd = document.getElementById("locationAdd");
  var AddLocation = document.getElementById("AddLocation");
  $(locationAdd).slideUp("slow");
  AddLocation.style.display = "block";
  markerz.setMap(null); 
  markerz = null;
}

$(document).keypress(
    function(event){
     if (event.which == '13') {
        event.preventDefault();
      }
});

$(document).on('hide.bs.modal','#myModal', function () {
	console.log("modal closed");
	retrieveData();
});

function retrieveData(){
	$.ajax({
		        url: window.location.href + "/getData",
		        type: 'POST',
		        success: function(data) {
		        	var myEvent = data.organizer_events;
		        	
		        	var eventKey;
		        	var retailerKey;
		        	var recheckQR;

		        	for(var keyss in myEvent){
		        		recheckQR = myEvent[keyss].qr_check;
		        		eventKey = myEvent[keyss].event_key
		        		organizerKey = myEvent[keyss].organizer_key

		        		var eventRow = document.getElementById('btnEvent_'+eventKey);
		        		eventRow.innerHTML = '<a class="btn btn-primary" style="margin-bottom:20px;" id="evt_'+eventKey+'" data-toggle="modal" data-target="#myModal" onclick="GenerateQR(\''+eventKey+'\',\''+recheckQR+'\',\''+organizerKey+'\')">Generate QR <span class="glyphicon glyphicon-qrcode"></span></a>';
		        	}
		        },
	      		error: function(xhr, status, error) {
	 			
			}
	});
}

        
