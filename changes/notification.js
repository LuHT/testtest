$(document).ready(function(){
    $("#bodyRetailerNotification").hide(0).delay(0).fadeIn(300)
});

function init(){
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
	var sender;
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
	console.log(notification.length);

	for(var i=0; i<notification.length; i++){
			eventID = notification[i].event_id;
			sender = notification[i].sender_name;
			senderID = notification[i].sender_id;
			receiver = notification[i].receiver_name;
			receiverID = notification[i].receiver_id;
			readStatus = notification[i].read;
			eventExp = notification[i].expiry_date;
			time = notification[i].timestamp;
			classific = notification[i].classification;
			notification_key = notification[i].notification_key;
			handle = notification[i].handles;

		if(classific == "invitation")
		{
			

			if(readStatus == "true"){
				console.log("nhahaha");
				loadercontainer.style.display = "none";
					notificationContainer.innerHTML += '<div id="'+eventID+'" class="notification '+"seen"+'"data-toggle="modal"  data-id ="'+eventID+'" data-target="#showEvent" onclick="initModal(\''+eventID+'\'), enableButton(), previewDialog(\''+eventID+'\',\''+senderID+'\',\''+sender+'\',\''+receiverID+'\',\''+receiver+'\', \''+notification_key+'\',\''+eventExp+'\',\''+classific+'\')">'
												+ '<span class="spanNotif"><a>'+sender+'</a> invited you to join an Event</span>'
												+ '<span class="pull-right">'+time+'</span></div>';

			}else{
				loadercontainer.style.display = "none";
					notificationContainer.innerHTML += '<div id="'+eventID+'" class="notification '+"new"+'" data-toggle="modal" data-id ="'+eventID+'" data-target="#showEvent" onclick="initModal(\''+eventID+'\'), enableButton(), previewDialog(\''+eventID+'\',\''+senderID+'\',\''+sender+'\',\''+receiverID+'\',\''+receiver+'\', \''+notification_key+'\',\''+eventExp+'\',\''+classific+'\')">'
												+ '<span class="spanNotif"><a>'+sender+'</a> invited you to join an Event</span>'
												+ '<span class="pull-right">'+time+'</span></div>';
			}
		}

		if(classific == "notification_invitation"){
			if(readStatus == "true"){
				console.log("nhahaha");
				loadercontainer.style.display = "none";
					notificationContainer.innerHTML += '<div id="'+eventID+'" class="notification '+"seen"+'"data-toggle="modal"  data-id ="'+eventID+'" data-target="#showEvent" onclick="initModal(\''+eventID+'\'), disableButton(), previewDialog(\''+eventID+'\',\''+senderID+'\',\''+sender+'\',\''+receiverID+'\',\''+receiver+'\', \''+notification_key+'\',\''+eventExp+'\',\''+classific+'\')">'
												+ '<span class="spanNotif"><a>'+sender+'</a> '+handle+' your Invitation</span>'
												+ '<span class="pull-right">'+time+'</span></div>';
			}else{
				loadercontainer.style.display = "none";
					notificationContainer.innerHTML += '<div id="'+eventID+'" class="notification '+"new"+'" data-toggle="modal" data-id ="'+eventID+'" data-target="#showEvent" onclick="initModal(\''+eventID+'\'), disableButton(), previewDialog(\''+eventID+'\',\''+senderID+'\',\''+sender+'\',\''+receiverID+'\',\''+receiver+'\', \''+notification_key+'\',\''+eventExp+'\',\''+classific+'\')">'
												+ '<span class="spanNotif"><a>'+sender+'</a> '+handle+' your Invitation</span>'
												+ '<span class="pull-right">'+time+'</span></div>';
			}
		}

		if(classific=="application"){
			if(readStatus == "true"){
				loadercontainer.style.display = "none";
					notificationContainer.innerHTML += '<div id="'+eventID+'" class="notification '+"seen"+'"data-toggle="modal"  data-id ="'+eventID+'" data-target="#showEventApplication" onclick="initModals(\''+eventID+'\'), previewDialogs(\''+eventID+'\',\''+senderID+'\',\''+sender+'\',\''+receiverID+'\',\''+receiver+'\', \''+notification_key+'\',\''+eventExp+'\',\''+classific+'\')">'
												+ '<span class="spanNotif"><a>'+sender+'</a> request to join your Event</span>'
												+ '<span class="pull-right">'+time+'</span></div>';
			}else{
				loadercontainer.style.display = "none";
					notificationContainer.innerHTML += '<div id="'+eventID+'" class="notification '+"new"+'" data-toggle="modal" data-id ="'+eventID+'" data-target="#showEventApplication" onclick="initModals(\''+eventID+'\'), previewDialogs(\''+eventID+'\',\''+senderID+'\',\''+sender+'\',\''+receiverID+'\',\''+receiver+'\', \''+notification_key+'\',\''+eventExp+'\',\''+classific+'\')">'
												+ '<span class="spanNotif"><a>'+sender+'</a> request to join your Event</span>'
												+ '<span class="pull-right">'+time+'</span></div>';
			}
		}

		if(classific == "notification_application"){
			if(readStatus == "true"){
				loadercontainer.style.display = "none";
					notificationContainer.innerHTML += '<div id="'+eventID+'" class="notification '+"seen"+'"data-toggle="modal"  data-id ="'+eventID+'" data-target="#showEvent" onclick="initModal(\''+eventID+'\'), disableButton(), previewDialog(\''+eventID+'\',\''+senderID+'\',\''+sender+'\',\''+receiverID+'\',\''+receiver+'\', \''+notification_key+'\',\''+eventExp+'\',\''+classific+'\')">'
												+ '<span class="spanNotif"><a>'+sender+'</a> '+handle+' your request</span>'
												+ '<span class="pull-right">'+time+'</span></div>';
			}else{
				loadercontainer.style.display = "none";
					notificationContainer.innerHTML += '<div id="'+eventID+'" class="notification '+"new"+'" data-toggle="modal" data-id ="'+eventID+'" data-target="#showEvent" onclick="initModal(\''+eventID+'\'), disableButton(), previewDialog(\''+eventID+'\',\''+senderID+'\',\''+sender+'\',\''+receiverID+'\',\''+receiver+'\', \''+notification_key+'\',\''+eventExp+'\',\''+classific+'\')">'
												+ '<span class="spanNotif"><a>'+sender+'</a> '+handle+' your request</span>'
												+ '<span class="pull-right">'+time+'</span></div>';
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
		  	document.getElementById("orgAdd").innerHTML = event.address;
		  	document.getElementById("evtStartDate").innerHTML = "<strong>Start date: </strong>" + event.start_date;
		  	document.getElementById("evtEndDate").innerHTML = "<strong>End date: </strong>" + event.end_date;
		  	/*====================================================================*/
		  	document.getElementById("eventDesc").innerHTML = "<strong>Description: </strong>" + event.description;
		  	var eventImg = document.getElementById("eventPoster");
		  	if(event.event_picture == "dummy"){
		  		eventImg.style.display = "none";
		  	}else{
		  		eventImg.src = event.event_picture;
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
function previewDialogs(eventKey, senderID, senderName, receiverID, receiverName, notification_key,eventExp,classification){
	console.log("sdfsdf");
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
		  	document.getElementById("reqName").innerHTML = senderName;
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

function initModal(eventID){
	
	document.getElementById("modalContent").style.display = "none";
	document.getElementById("loadercontainer").style.display = "block";
	var checkRead = document.getElementById(eventID);
	if(checkRead.className == "notification seen"){
		console.log("NOTHING NEW");
	}else{
		checkRead.className = "notification seen";
	}
}

function initModals(eventID){
	console.log("trst");
	
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
					$('#'+eventKey).remove();
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
						$('#'+eventKey).remove();
						console.log(eventKey);
				}
			},
		    error: function(xhr, status, error) {

		 	}
		});
	console.log("decline");
}