$(document).ready(function(){
    $("#bodyRetailerNotification").hide(0).delay(0).fadeIn(300)
});

function init(){
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
	console.log("notification");
		$.ajax({
		        url: window.location.href + "/notification",
		        type: 'POST',
		        success: function(data) {
		        	console.log(data.notification);
		        	draw(data.notification)
		        },
	      		error: function(xhr, status, error) {
	 			
			}
	   		});

}

function draw(notification)
{
	var eventID;
	var presender;
	var sender
	var senderID;
	var receiver;
	var receiverID;
	var readStatus;
	var eventExp;
	var time;
	var handle;
	var classific;
	var notificationContainer = document.getElementById("notificationDIV");
	var loadercontainer = document.getElementById("loader");
	console.log(notification);

	for(var i=0; i<notification.length; i++){
			eventID = notification[i].event_id;
			presender = notification[i].sender_name;
			sender = presender.replace(/'/g,"_");
			senderID = notification[i].sender_id;
			receiver = notification[i].receiver_name;
			receiverID = notification[i].receiver_id;
			readStatus = notification[i].read;
			eventExp = notification[i].expiry_date;
			time = notification[i].timestamp;
			classific = notification[i].classification;
			notification_key = notification[i].notification_key;
			handle = notification[i].handles;

		if(classific == "invitation"){
			if(readStatus == "true"){
				loadercontainer.style.display = "none";
					notificationContainer.innerHTML += '<div id="'+notification_key+'" class="notification '+"seen"+'" data-toggle="modal"  data-id ="'+eventID+'" data-target="#showEvent" onclick="initModal(\''+notification_key+'\'), enableButton(), previewDialog(\''+eventID+'\',\''+senderID+'\',\''+sender+'\',\''+receiverID+'\',\''+receiver+'\', \''+notification_key+'\',\''+eventExp+'\',\''+classific+'\')">'
												+ '<span class="spanNotif"><a>'+sender.replace(/_/g,"'")+'</a> invited you to join an Event</span>'
												+ '<span class="pull-right">'+Converttimestamp(time)+'</span></div>';

			}else{
				loadercontainer.style.display = "none";
					notificationContainer.innerHTML += '<div id="'+notification_key+'" class="notification '+"new"+'" data-toggle="modal" data-id ="'+eventID+'" data-target="#showEvent" onclick="initModal(\''+notification_key+'\'), enableButton(), previewDialog(\''+eventID+'\',\''+senderID+'\',\''+sender+'\',\''+receiverID+'\',\''+receiver+'\', \''+notification_key+'\',\''+eventExp+'\',\''+classific+'\')">'
												+ '<span class="spanNotif"><a>'+sender.replace(/_/g,"'")+'</a> invited you to join an Event</span>'
												+ '<span class="pull-right">'+Converttimestamp(time)+'</span></div>';
			}
		}

		if(classific == "notification_invitation"){
			if(readStatus == "true"){
				loadercontainer.style.display = "none";
					notificationContainer.innerHTML += '<div id="'+notification_key+'" class="notification '+"seen"+'" data-toggle="modal"  data-id ="'+eventID+'" data-target="#showEvent" onclick="initModal(\''+notification_key+'\'), disableButton(), previewDialog(\''+eventID+'\',\''+senderID+'\',\''+sender+'\',\''+receiverID+'\',\''+receiver+'\', \''+notification_key+'\',\''+eventExp+'\',\''+classific+'\')">'
												+ '<span class="spanNotif"><a>'+sender.replace(/_/g,"'")+'</a> '+handle+' your Invitation</span>'
												+ '<span class="pull-right">'+Converttimestamp(time)+'</span></div>';
			}else{
				loadercontainer.style.display = "none";
					notificationContainer.innerHTML += '<div id="'+notification_key+'" class="notification '+"new"+'" data-toggle="modal" data-id ="'+eventID+'" data-target="#showEvent" onclick="initModal(\''+notification_key+'\'), disableButton(), previewDialog(\''+eventID+'\',\''+senderID+'\',\''+sender+'\',\''+receiverID+'\',\''+receiver+'\', \''+notification_key+'\',\''+eventExp+'\',\''+classific+'\')">'
												+ '<span class="spanNotif"><a>'+sender.replace(/_/g,"'")+'</a> '+handle+' your Invitation</span>'
												+ '<span class="pull-right">'+Converttimestamp(time)+'</span></div>';
			}
		}

		if(classific=="application"){
			if(readStatus == "true"){
				loadercontainer.style.display = "none";
					notificationContainer.innerHTML += '<div id="'+notification_key+'" class="notification '+"seen"+'" data-toggle="modal"  data-id ="'+eventID+'" data-target="#showEventApplication" onclick="initModal(\''+notification_key+'\'), previewRequestDialog(\''+eventID+'\',\''+senderID+'\',\''+sender+'\',\''+receiverID+'\',\''+receiver+'\', \''+notification_key+'\',\''+eventExp+'\',\''+classific+'\')">'
												+ '<span class="spanNotif"><a>'+sender.replace(/_/g,"'")+'</a> request to join your Event</span>'
												+ '<span class="pull-right">'+Converttimestamp(time)+'</span></div>';
			}else{
				loadercontainer.style.display = "none";
					notificationContainer.innerHTML += '<div id="'+notification_key+'" class="notification '+"new"+'" data-toggle="modal" data-id ="'+eventID+'" data-target="#showEventApplication" onclick="initModal(\''+notification_key+'\'), previewRequestDialog(\''+eventID+'\',\''+senderID+'\',\''+sender+'\',\''+receiverID+'\',\''+receiver+'\', \''+notification_key+'\',\''+eventExp+'\',\''+classific+'\')">'
												+ '<span class="spanNotif"><a>'+sender.replace(/_/g,"'")+'</a> request to join your Event</span>'
												+ '<span class="pull-right">'+Converttimestamp(time)+'</span></div>';
			}
		}

		if(classific == "notification_application"){
			if(readStatus == "true"){
				loadercontainer.style.display = "none";
					notificationContainer.innerHTML += '<div id="'+notification_key+'" class="notification '+"seen"+'" data-toggle="modal"  data-id ="'+eventID+'" data-target="#showEvent" onclick="initModal(\''+notification_key+'\'), disableButton(), previewDialog(\''+eventID+'\',\''+senderID+'\',\''+sender+'\',\''+receiverID+'\',\''+receiver+'\', \''+notification_key+'\',\''+eventExp+'\',\''+classific+'\')">'
												+ '<span class="spanNotif"><a>'+sender.replace(/_/g,"'")+'</a> '+handle+' your request</span>'
												+ '<span class="pull-right">'+Converttimestamp(time)+'</span></div>';
			}else{
				loadercontainer.style.display = "none";
					notificationContainer.innerHTML += '<div id="'+notification_key+'" class="notification '+"new"+'" data-toggle="modal" data-id ="'+eventID+'" data-target="#showEvent" onclick="initModal(\''+notification_key+'\'), disableButton(), previewDialog(\''+eventID+'\',\''+senderID+'\',\''+sender+'\',\''+receiverID+'\',\''+receiver+'\', \''+notification_key+'\',\''+eventExp+'\',\''+classific+'\')">'
												+ '<span class="spanNotif"><a>'+sender.replace(/_/g,"'")+'</a> '+handle+' your request</span>'
												+ '<span class="pull-right">'+Converttimestamp(time)+'</span></div>';
			}
		}

		if(classific == "request_post"){
			if(readStatus == "true"){
				loadercontainer.style.display = "none";
					notificationContainer.innerHTML += '<div id="'+notification_key+'" class="notification '+"seen"+'" data-toggle="modal"  data-id ="'+eventID+'" data-target="#showSubEvent" onclick="initModal(\''+notification_key+'\'), previewSubEvent(\''+eventID+'\',\''+senderID+'\',\''+sender+'\',\''+receiverID+'\',\''+receiver+'\', \''+notification_key+'\',\''+eventExp+'\',\''+classific+'\')">'
												+ '<span class="spanNotif"><a>'+sender.replace(/_/g,"'")+'</a> request to post an event.</span>'
												+ '<span class="pull-right">'+Converttimestamp(time)+'</span></div>';
			}else{
				loadercontainer.style.display = "none";
					notificationContainer.innerHTML += '<div id="'+notification_key+'" class="notification '+"new"+'" data-toggle="modal" data-id ="'+eventID+'" data-target="#showSubEvent" onclick="initModal(\''+notification_key+'\'), previewSubEvent(\''+eventID+'\',\''+senderID+'\',\''+sender+'\',\''+receiverID+'\',\''+receiver+'\', \''+notification_key+'\',\''+eventExp+'\',\''+classific+'\')">'
												+ '<span class="spanNotif"><a>'+sender.replace(/_/g,"'")+'</a> request to post an event.</span>'
												+ '<span class="pull-right">'+Converttimestamp(time)+'</span></div>';
			}
		}

		if(classific == "notification_post"){
			if(readStatus == "true"){
				if(handle=="accepted"){
					loadercontainer.style.display = "none";
					notificationContainer.innerHTML += '<div id="'+notification_key+'" class="notification '+"seen"+'" data-toggle="modal"  data-id ="'+eventID+'" data-target="#showDeclinedSubEvent" onclick="initModal(\''+notification_key+'\'), disableButton(), previewDeclinedSubEvent(\''+eventID+'\',\''+senderID+'\',\''+sender+'\',\''+receiverID+'\',\''+receiver+'\', \''+notification_key+'\',\''+eventExp+'\',\''+classific+'\')">'
												+ '<span class="spanNotif"><a>'+sender.replace(/_/g,"'")+'</a> '+handle+' your request</span>'
												+ '<span class="pull-right">'+Converttimestamp(time)+'</span></div>';
				}else{
					loadercontainer.style.display = "none";
					notificationContainer.innerHTML += '<div id="'+notification_key+'" class="notification '+"seen"+'" data-toggle="modal"  data-id ="'+eventID+'" data-target="#showDeclinedSubEvent" onclick="initModal(\''+notification_key+'\'), disableButton(), previewDeclinedSubEvent(\''+eventID+'\',\''+senderID+'\',\''+sender+'\',\''+receiverID+'\',\''+receiver+'\', \''+notification_key+'\',\''+eventExp+'\',\''+classific+'\')">'
												+ '<span class="spanNotif"><a>'+sender.replace(/_/g,"'")+'</a> '+handle+' your request</span>'
												+ '<span class="pull-right">'+Converttimestamp(time)+'</span></div>';
				}
				
			}else{
				if(handle=="declined"){
					loadercontainer.style.display = "none";
					notificationContainer.innerHTML += '<div id="'+notification_key+'" class="notification '+"new"+'" data-toggle="modal" data-id ="'+eventID+'" data-target="#showDeclinedSubEvent" onclick="initModal(\''+notification_key+'\'), disableButton(), previewDeclinedSubEvent(\''+eventID+'\',\''+senderID+'\',\''+sender+'\',\''+receiverID+'\',\''+receiver+'\', \''+notification_key+'\',\''+eventExp+'\',\''+classific+'\')">'
												+ '<span class="spanNotif"><a>'+sender.replace(/_/g,"'")+'</a> '+handle+' your request</span>'
												+ '<span class="pull-right">'+Converttimestamp(time)+'</span></div>';
				}else{
					loadercontainer.style.display = "none";
					notificationContainer.innerHTML += '<div id="'+notification_key+'" class="notification '+"new"+'" data-toggle="modal" data-id ="'+eventID+'" data-target="#showDeclinedSubEvent" onclick="initModal(\''+notification_key+'\'), disableButton(), previewDeclinedSubEvent(\''+eventID+'\',\''+senderID+'\',\''+sender+'\',\''+receiverID+'\',\''+receiver+'\', \''+notification_key+'\',\''+eventExp+'\',\''+classific+'\')">'
												+ '<span class="spanNotif"><a>'+sender.replace(/_/g,"'")+'</a> '+handle+' your request</span>'
												+ '<span class="pull-right">'+Converttimestamp(time)+'</span></div>';
				}
				
			}
		}
	}
}

//Read status change -> get Event
function previewDialog(eventKey, senderID, senderName, receiverID, receiverName, notification_key,eventExp,classification){
	$.ajax({
		url: window.location.href + "/retrieve_event",
		type: 'POST',
		data: {eventKey :eventKey,  notification_key: notification_key},
		success: function(data) {
			var event = data.event["data"];
			console.log(event);
		  	document.getElementById("orgProfPic").src = event.organizer_pic;	
		  	document.getElementById("orgName").innerHTML = event.organizer_name;
		  	document.getElementById("evtTitle").innerHTML = "<strong>"+event.event_title+"</strong>";
		  	document.getElementById("orgAdd").innerHTML = "<strong>Event Location: </strong>" + event.address;
		  	document.getElementById("evtStartDate").innerHTML = "<strong>Event Start date: </strong>" + event.start_date;
		  	document.getElementById("evtEndDate").innerHTML = "<strong>Event End date: </strong>" + event.end_date;
		  	/*====================================================================*/
		  	
		  	var eventImg = document.getElementById("eventPoster");
		  	if(event.event_picture == "dummy"){
		  		eventImg.style.display = "none";
		  	}else{
		  		var imageInput = event.event_picture;
		  		eventImg.src = imageInput;
		  		console.log(event.event_picture);
		  		eventImg.style.display = "block";
		  	}
		  	/*====================================================================*/
		  	var collaborator = event.collaboration.collaborator;
		  	var collabArea = document.getElementById("collabView");
		  	collabArea.innerHTML = "";
		  	for(var key in collaborator){
		  		collabArea.innerHTML += '<img src="'+collaborator[key].organizer_pic+'" style="border-radius:50%; width:60px; height:60px; margin:15px; box-shadow: inset 3px 3px 10px 0 #000000;"/>';
		  	}
		  	/*====================================================================*/

		  	var ticketSystem = event.participation;
		  	if(ticketSystem.participate == "off"){
		  		document.getElementById("ticketRow").style.display = "none";
		  	}else{
		  		document.getElementById("ticketRow").style.display = "block";
		  		//===========================================================

		  		var noTicket = ticketSystem.tickets;
		  		var ticketArea = document.getElementById("ticketField");
		  		ticketArea.innerHTML = "";
		  		for(var key in noTicket){
		  			ticketArea.innerHTML += '<div class="container-fluid" style="max-width: 90%; border-radius: 5px; background-color: #f2f2f2; box-shadow: 3px 3px 10px #7a7a7a; margin-bottom:15px;">'
		  								  + '<h5><strong>'+noTicket[key].ticket_title+'</strong></h5>'
		  								  + '<h6><strong>Ticket type: </strong>'+noTicket[key].ticket_type+'</h6>'
		  								  + '<div class="row" style="background-color: #383838">'
		  								  + '<div class="container-fluid"><h6 style="color:white">'+noTicket[key].ticket_description+'</h6></div></div>'
		  								  + '<h6><strong>Available Ticket/s: </strong>'+noTicket[key].available_ticket+'</h6>'
		  								  + '<h6><strong>Ticket Price: </strong>'+noTicket[key].ticket_price+'</h6>'
		  		}
		  	}
		  	/*====================================================================*/
		  	var acceptButton = document.getElementById("acceptBtn");
		  	acceptButton.setAttribute('onclick','acceptEvent("'+eventKey+'","'+senderID+'","'+senderName+'","'+receiverID+'","'+receiverName+'","' + notification_key+'","' + eventExp+'","' + classification+'")');

		  	var declineButton = document.getElementById("declineBtn");
		  	declineButton.setAttribute('onclick','declineEvent("'+eventKey+'","'+senderID+'","'+senderName+'","'+receiverID+'","'+receiverName+'","'+notification_key+'","' + eventExp+'","' + classification+'")');
		  	/*====================================================================*/
		  	document.getElementById("modalContent").style.display = "block";
		  	document.getElementById("loadercontainer").style.display = "none";
		},
	    error: function(xhr, status, error) {
	 	}
	});
}

//Read status change -> get Event
function previewRequestDialog(eventKey, senderID, senderName, receiverID, receiverName, notification_key,eventExp,classification){
	console.log("previewdialogs");
	$.ajax({
		url: window.location.href + "/retrieve_event",
		type: 'POST',
		data: {eventKey :eventKey,  notification_key: notification_key},
		success: function(data) {
			var event = data.event["data"];
			var organizer_pic;
			var collaboration_data = event.collaboration;
			var collaborator_data =collaboration_data.collaborator;
			console.log(collaboration_data);
			console.log(senderID);
			for(var key in collaborator_data)
			{

				if(collaborator_data[key].organizer_id == senderID)
				{
					organizer_pic = collaborator_data[key].organizer_pic;
					console.log(collaborator_data[key].organizer_id);
					console.log(senderID);
				}
			}
			console.log(organizer_pic);
			console.log(event);
		  	document.getElementById("reqProfPic").src = organizer_pic;	
		  	document.getElementById("reqName").innerHTML = senderName.replace(/_/g,"'");
		  	document.getElementById("startdate").innerHTML = "<strong>Start date: </strong>" + event.start_date;
		  	document.getElementById("enddate").innerHTML = "<strong>End date: </strong>" + event.end_date;
		  	/*====================================================================*/
		  	document.getElementById("reqDesc").innerHTML = "<strong>Description: </strong>" + event.description;
		  	var eventImg = document.getElementById("reqPoster");
		  	if(event.event_picture == "dummy"){
		  		eventImg.style.display = "none";
		  	}else{
		  		eventImg.src = event.event_picture;
		  		eventImg.style.display = "block";
		  	}
		  	/*====================================================================*/
		  	var collaborator = event.collaboration.collaborator;
		  	var collabArea = document.getElementById("reqCollabView");
		  	collabArea.innerHTML = "";
		  	for(var key in collaborator){
		  		collabArea.innerHTML += '<img src="'+collaborator[key].organizer_pic+'" style="border-radius:50%; width:60px; height:60px; margin:15px; box-shadow: inset 3px 3px 10px 0 #000000;"/>';
		  	}
		  	
		  	/*====================================================================*/
		  	var acceptButton = document.getElementById("reqAcceptBtn");
		  	acceptButton.setAttribute('onclick','acceptEvent("'+eventKey+'","'+senderID+'","'+senderName+'","'+receiverID+'","'+receiverName+'","' + notification_key+'","' + eventExp+'","' + classification+'")');

		  	var declineButton = document.getElementById("reqDeclineBtn");
		  	declineButton.setAttribute('onclick','declineEvent("'+eventKey+'","'+senderID+'","'+senderName+'","'+receiverID+'","'+receiverName+'","'+notification_key+'","' + eventExp+'","' + classification+'")');
		  	/*====================================================================*/
		  	document.getElementById("modalContents").style.display = "block";
		  	document.getElementById("loadercontainers").style.display = "none";
		},
	    error: function(xhr, status, error) {
	 	}
	});
}

function previewSubEvent(eventKey, senderID, senderName, receiverID, receiverName, notification_key, eventExp, classification){
	console.log(eventExp);
	$.ajax({
		url: window.location.href + "/retrieve_event",
		type: 'POST',
		data: {eventKey :eventKey,  notification_key: notification_key},
		success: function(data) {
			var event = data.event["data"];
			var requestor_pic;
			var organizer_pic = event.organizer_pic;
			var organizer_name = event.organizer_name;
			var collaboration_data = event.collaboration;
			var collaborationPost = event.collaborator_post;
			var collaborator_data =collaboration_data.collaborator;
			console.log(collaboration_data);

			//console.log(senderID);
			for(var key in collaborator_data)
			{

				if(collaborator_data[key].organizer_id == senderID)
				{
					requestor_pic = collaborator_data[key].organizer_pic;

					//console.log(collaborator_data[key].organizer_id);
					//console.log(senderID);
				}
			}
			console.log(organizer_pic);
			console.log(event);
		  	document.getElementById("ProfPic").src = organizer_pic;	
		  	document.getElementById("Name").innerHTML = organizer_name;
		  	document.getElementById("evnTitle").innerHTML = event.event_title;
		  	document.getElementById("Add").innerHTML = '<strong>Located @ </strong><a>'+event.address+'</a>';
		  	document.getElementById("StartDate").innerHTML = "<strong>Start date: </strong>" + event.start_date;
		  	document.getElementById("EndDate").innerHTML = "<strong>End date: </strong>" + event.end_date;
		  	/*====================================================================*/
		  	document.getElementById("mainDesc").innerHTML = "<strong>Description: </strong>" + event.description;
		  	var eventImg = document.getElementById("subeventPoster");
		  	if(event.event_picture == "dummy"){
		  		eventImg.style.display = "none";
		  	}else{
		  		eventImg.src = event.event_picture;
		  		eventImg.style.display = "block";
		  	}
		  	/*====================================================================*/
		  	var collaborator = event.collaboration.collaborator;
		  	var collabArea = document.getElementById("subcollabView");
		  	collabArea.innerHTML = "";
		  	for(var key in collaborator){
		  		collabArea.innerHTML += '<img src="'+collaborator[key].organizer_pic+'" style="border-radius:50%; width:60px; height:60px; margin:15px; box-shadow: inset 3px 3px 10px 0 #000000;"/>';
		  	}
		  	
		  	/*====================================================================*/
		  	//console.log("sender_name "+ senderName);
		  	//console.log("sender_pic " + requestor_pic);
		  	

			for(var keys in collaborationPost){
				if(senderName.replace(/_/g, "'") == collaborationPost[keys].organizer_name){
					document.getElementById("requestProfPic").src = requestor_pic;
					document.getElementById("requestName").innerHTML = senderName;
					document.getElementById("requestAdd").innerHTML = collaborationPost[keys].address;
					document.getElementById("subeventDesc").innerHTML = '<strong>Description: </strong>'+collaborationPost[keys].description;
					document.getElementById("subeventRePoster").src = collaborationPost[keys].event_picture;
				}
			}
		  	/*====================================================================*/
		  	var acceptButtonPost = document.getElementById("AcceptPost");
		  	acceptButtonPost.setAttribute('onclick','acceptEventPost("'+eventKey+'","'+senderID+'","'+senderName+'","'+receiverID+'","'+receiverName+'","' + notification_key+'","' + eventExp+'","' + classification+'")');

		  	var declineButtonPost = document.getElementById("declinePostSubmit");
		  	declineButtonPost.setAttribute('onclick','declineEventPost("'+eventKey+'","'+senderID+'","'+senderName+'","'+receiverID+'","'+receiverName+'","'+notification_key+'","' + eventExp+'","' + classification+'")');



		  	document.getElementById("subeventloader").style.display = "none";
		  	document.getElementById("subEventModalContent").style.display = "block";
		},
	    error: function(xhr, status, error) {
	 	}
	});
}

function previewDeclinedSubEvent(eventKey, senderID, senderName, receiverID, receiverName, notification_key,eventExp,classification){
	console.log("sdfsdf");
	console.log(eventExp);
	$.ajax({
		url: window.location.href + "/retrieve_event",
		type: 'POST',
		data: {eventKey :eventKey,  notification_key: notification_key},
		success: function(data) {
			var event = data.event["data"];
			console.log(event);
			var requestor_pic;
			var organizer_pic = event.organizer_pic;
			var organizer_name = event.organizer_name;
			var collaboration_data = event.collaboration;
			var collaborationPost = event.collaborator_post;
			var collaborator_data =collaboration_data.collaborator;
			console.log(collaboration_data);

			//console.log(senderID);
			for(var key in collaborator_data)
			{

				if(collaborator_data[key].organizer_id == receiverID)
				{
					my_pic = collaborator_data[key].organizer_pic;

					//console.log(collaborator_data[key].organizer_id);
					//console.log(senderID);
				}
			}
			console.log(organizer_pic);
			console.log(event);
		  	document.getElementById("mainProfPic").src = organizer_pic;	
		  	document.getElementById("MainName").innerHTML = organizer_name;
		  	document.getElementById("mainEvnTitle").innerHTML = event.event_title;
		  	document.getElementById("MainAdd").innerHTML = '<strong>Located @ </strong><a>'+event.address+'</a>';
		  	document.getElementById("MainStartDate").innerHTML = "<strong>Start date: </strong>" + event.start_date;
		  	document.getElementById("MainEndDate").innerHTML = "<strong>End date: </strong>" + event.end_date;
		  	/*====================================================================*/
		  	document.getElementById("mainEventDesc").innerHTML = "<strong>Description: </strong>" + event.description;
		  	var eventImg = document.getElementById("MainEventPoster");
		  	if(event.event_picture == "dummy"){
		  		eventImg.style.display = "none";
		  	}else{
		  		eventImg.src = event.event_picture;
		  		eventImg.style.display = "block";
		  	}
		  	/*====================================================================*/
		  	var collaborator = event.collaboration.collaborator;
		  	var collabArea = document.getElementById("mainsubcollabView");
		  	collabArea.innerHTML = "";
		  	for(var key in collaborator){
		  		collabArea.innerHTML += '<img src="'+collaborator[key].organizer_pic+'" style="border-radius:50%; width:60px; height:60px; margin:15px; box-shadow: inset 3px 3px 10px 0 #000000;"/>';
		  	}
		  	
		  	/*====================================================================*/
		  	//console.log("sender_name "+ senderName);
		  	//console.log("sender_pic " + requestor_pic);

			for(var keys in collaborationPost){
				if(receiverName == collaborationPost[keys].organizer_name){
					console.log(senderName);
					document.getElementById("declinedreasons").innerHTML = collaborationPost[keys].feedback;
					document.getElementById("subProfPic").src = my_pic;
					document.getElementById("subName").innerHTML = senderName;
					document.getElementById("subAdd").innerHTML = collaborationPost[keys].address;
					document.getElementById("subDesc").innerHTML = '<strong>Description: </strong>'+collaborationPost[keys].description;
					document.getElementById("declinedPoster").src = collaborationPost[keys].event_picture;
				}
			}
		  	/*====================================================================*/
	/*	  	var acceptButtonPost = document.getElementById("AcceptPost");
		  	acceptButtonPost.setAttribute('onclick','acceptEventPost("'+eventKey+'","'+senderID+'","'+senderName+'","'+receiverID+'","'+receiverName+'","' + notification_key+'","' + eventExp+'","' + classification+'")');

		  	var declineButtonPost = document.getElementById("declinePostSubmit");
		  	declineButtonPost.setAttribute('onclick','declineEventPost("'+eventKey+'","'+senderID+'","'+senderName+'","'+receiverID+'","'+receiverName+'","'+notification_key+'","' + eventExp+'","' + classification+'")');
*/
	$('#Resubmit').data('id',eventKey + "," + organizer_name);

		  	document.getElementById("mainsubeventloader").style.display = "none";
		  	document.getElementById("mainsubEventModalContent").style.display = "block";
		},
	    error: function(xhr, status, error) {
	 	}
	});
}

function submitSubEvent(){
	$("#previewPos").slideUp("fast");
	$("#repostEvent").slideDown("slow");
}

function cancelresubmission(){
	$("#previewPos").slideDown("slow");
	$("#repostEvent").slideUp("fast");
}



$(document).keypress(
    function(event){
     if (event.which == '13') {
        event.preventDefault();
      }
});

$(document).ready(function () {
$("#subevent_form").submit(function(e) {
	var Return = true;
	   e.preventDefault();
	   console.log("here");
	   var event_organizer_i =  ($("#Resubmit").data('id')).split(",");
	   console.log(event_organizer_i);
	   	var formData =  $(this).serialize().split("&");
    var InfoJson={};
    for(var key in formData)
    {
        InfoJson[formData[key].split("=")[0]] = formData[key].split("=")[1];   
    }
    //Convert Decode %
    for (var key in InfoJson)
    {
    	InfoJson[key] = decodeURI(InfoJson[key]);
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
 		//can put one modal loading for re posting here
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
					    //after post done close the modal here
        				console.log("sss");
					    },
					error: function(xhr, status, error) {


					}
				});
		});
 	}

	});
});









function declineShowMore(){
	var getID = document.getElementById("showDeclinePostLink");
	if(getID.innerHTML == "Show more details"){
		$("#declinePostInformation").slideDown();
		getID.innerHTML = "Show less details";
	}else{
		$("#declinePostInformation").slideUp();
		getID.innerHTML = "Show more details";
	}
}

function showMore(){
	var getID = document.getElementById("showMoreLink");
	if(getID.innerHTML == "Show more details"){
		$("#eventmoreinfo").slideDown();
		getID.innerHTML = "Show less details";
	}else{
		$("#eventmoreinfo").slideUp();
		getID.innerHTML = "Show more details";
	}
}

function initModal(senderID){
	
	document.getElementById("modalContent").style.display = "none";
	document.getElementById("loadercontainer").style.display = "block";
	var checkRead = document.getElementById(senderID);
	if(checkRead.className == "notification seen"){
		console.log("nothing new");
	}else{
		checkRead.className = "notification seen";
	}
}

function disableButton(){
	document.getElementById("buttonHandling").style.display = "none";
}

function enableButton(){
	document.getElementById("buttonHandling").style.display = "block";
}

function acceptEvent(eventKey, senderID, senderName, receiverID, receiverName, notification_key,eventExp, classifications){
	console.log("accc : "  +notification_key);
	
	$.ajax({
		url: window.location.href + "/handlenotification",
		type: 'POST',
		data: {eventKey :eventKey ,notification_key : notification_key, senderID : senderID ,receiverID : receiverID, result : "accepted" , senderName : senderName ,receiverName : receiverName ,eventExp:eventExp, classification:classifications},
		success: function(data) {
			if(data.result == "success")
			{
				console.log("data result success");
					$('#'+notification_key).remove();
					$('#showEvent').modal('hide');
			}
		},
	    error: function(xhr, status, error) {

	 	}
	});
	console.log("accepted");

}

function declineEvent(eventKey, senderID, senderName, receiverID, receiverName, notification_key,eventExp, classifications){
		$.ajax({
			url: window.location.href + "/handlenotification",
			type: 'POST',
			data: {eventKey :eventKey ,notification_key : notification_key, senderID : senderID ,receiverID : receiverID, result : "declined" , senderName : senderName ,receiverName : receiverName ,eventExp:eventExp, classification:classifications},
			success: function(data) {
				if(data.result == "success")
				{
					console.log("data result success");
						$('#'+notification_key).remove();
						$('#showEvent').modal('hide');
						console.log(eventKey);
				}
			},
		    error: function(xhr, status, error) {
		 	}
		});
	console.log("decline");
}

function acceptEventPost(eventKey, senderID, senderName, receiverID, receiverName, notification_key,eventExp, classifications){
	console.log("accc : "  +notification_key);
	
	$.ajax({
		url: window.location.href + "/handlenotification",
		type: 'POST',
		data: {eventKey :eventKey ,notification_key : notification_key, senderID : senderID ,receiverID : receiverID, result : "accepted" , senderName : senderName ,receiverName : receiverName ,eventExp:eventExp, classification:classifications},
		success: function(data) {
			if(data.result == "success")
			{
				console.log("data result success");
					//$('#'+eventKey).remove();
				$('#showSubEvent').modal('hide');
				$('#'+notification_key).remove();
			}
		},
	    error: function(xhr, status, error) {

	 	}
	});
	console.log("accepted");

}

function declineEventPost(eventKey, senderID, senderName, receiverID, receiverName, notification_key,eventExp, classifications){
	//$('#declinePostSubmit').data('id',eventKey + "," + senderID + "," + senderName + "," + receiverID + "," + notification_key + "," + eventExp + ","+  classifications);
	var declineTextarea = document.getElementById("declineTextarea");
	console.log(declineTextarea.value);
	if(declineTextarea.value != "")
	{
		console.log("proceed");
		$.ajax({
			url: window.location.href + "/handlenotification",
			type: 'POST',
			data: {eventKey :eventKey ,notification_key : notification_key, senderID : senderID ,receiverID : receiverID, result : "declined" , senderName : senderName ,receiverName : receiverName ,eventExp:eventExp, classification:classifications, feedback :declineTextarea.value},
			success: function(data) {
				if(data.result == "success")
				{
					console.log("data result success");
					$('#showSubEvent').modal('hide');
					$('#'+notification_key).remove();
						/*$('#'+eventKey).remove();
						console.log(eventKey);*/
				}
			},
		    error: function(xhr, status, error) {
		 	}
		});
			
	}
	else
	{
		console.log("dont left empty");
	}



	console.log("decline");
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


function showMyPost(){
	var link = document.getElementById("showMyPostLink");

	if(link.innerHTML == "Show More"){
		link.innerHTML = "Show Less";
		$("#mypostInformation").slideDown("slow");
	}else{
		link.innerHTML = "Show More";
		$("#mypostInformation").slideUp("slow");
	}
}


function SignOut(){
	//console.log("Sign out Success");
		$.post(window.location.href,{Signout: "yes"}, function(data){
          	window.location = data.redirect;
          });
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
