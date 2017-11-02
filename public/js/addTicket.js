var countv = 0;
var ticketArray = [];
$(document).ready(function(){
	countv = 0;
});
onkeypress="return validatePhone(event)"
function addTicket(){
	var ticket_count = ticketArray.length;
	var tickettext;
	var ticketContainer = document.getElementById("ticketContainer");
	var addTicketHTML ='<div class="panel panel-default panel-body" id="ticket_'+ticket_count+'">'
							+'<a class="pull-right" id= "removeticket'+ticket_count+'" style="font-size:20px;" onclick="removeTicket(\''+'ticket_'+ticket_count+'\')"><span class="glyphicon glyphicon-remove-sign fa-lg"></span></a>'
							+'<label>Ticket</label>'
							+'<a class="pull-right" id = "showticket'+ticket_count+'" style="margin-right:10px; margin-top:3px;" onclick="showTicketBox(\''+'box'+ticket_count+'\')">Edit</a>'
							+'<div class="container-fluid" id="box'+ticket_count+'" style="display: none"><hr>'
							+'<label>Ticket type:</label><select type="text" class="form-control" id="ticketType'+ticket_count+'"  name="ticket_type'+ticket_count+'">'
							+'<option id = "selectedOp2" value="selected" selected="true" disabled="true">Select ticket type</option>'
							+'<option id="ticketOption" value="Free">Free</option>'
							+'<option id="ticketOption" value="Not Free">Not Free</option></select><br>'
							+'<label>Ticket Price</label><input class="form-control" type="text" id="ticket_price'+ticket_count+'" onkeypress="return validateNumber(event)" name="ticket_price'+ticket_count+'"/><br>'
							+'<label>Ticket Title</label><input class="form-control" type="text" id="ticket_title'+ticket_count+'" name="ticket_title'+ticket_count+'"/><br>'
							+'<label>Ticket Description</label><input class="form-control" type="text" id="ticket_description'+ticket_count+'" name="ticket_description'+ticket_count+'"/><br>'
							+'<label>No. Available Ticket</label><input class="form-control" type="text" id="available_ticket'+ticket_count+'" onkeypress="return validateNumber(event)" name="available_ticket'+ticket_count+'"/><br>'
							+'<div class="row"><div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">'
							+'<label class="control-label" for="date">Start Date: </label>'
							+'<div class="bootstrap-iso"><input class="form-control" id="startDate'+ticket_count+'" name="ticket_start_date'+ticket_count+'" placeholder="YYYY-MM-DD" type="text" onchange="ticketDate(\''+ticket_count+'\')"/></div></div>'
							+'<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6"><label class="control-label" for="date">End Date: </label>'
							+'<div class="bootstrap-iso"><input class="form-control" id="endDate'+ticket_count+'" name="ticket_end_date'+ticket_count+'" placeholder="YYYY-MM-DD" type="text" disabled/></div></div></div><br></div></div>';
							tickettext = "ticket_"+ ticket_count;
							ticketArray.push(tickettext);
							console.log(ticketArray);
							var startDate = document.getElementById("startDate");
       						var endDate = document.getElementById("endDate");


	$(addTicketHTML).hide().appendTo(ticketContainer).fadeIn(500);
		
	$("#startDate" +ticket_count).ready(function() {
		var eventEndDate = document.getElementById("eventEndDate").value;
        var date_input=$('input[id="startDate'+ticket_count+'"]'); //our date input has the name "date"
		var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
		var options={
		format: 'yyyy-mm-dd',
		container: container,
		todaysHighlight: true,
		autoclose: true,
		startDate: new Date(),
		endDate: eventEndDate
	 };
	  date_input.datepicker(options);
    });


    $("#endDate" + ticket_count).ready(function() {
    	var eventEndDate = document.getElementById("eventEndDate").value;
        var date_input=$('input[id="endDate'+ticket_count+'"]'); //our date input has the name "date"
		var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
		var options={
		format: 'yyyy-mm-dd',
		container: container,
		todaysHighlight: true,
		autoclose: true,
		startDate: new Date(),
		endDate: eventEndDate
	 };
	  date_input.datepicker(options);
    });
}

function ticketDate(ticketCount){
	var ticketStartDate = document.getElementById("startDate"+ticketCount).value;
	$('#endDate'+ticketCount).datepicker('setStartDate', ticketStartDate);
	$('#endDate'+ticketCount).removeAttr("disabled");

}

function showTicketBox(boxNumber){
	var showInnerTicket = document.getElementById(boxNumber);
	if(showInnerTicket.style.display == "none"){
		showInnerTicket.style.display = "block";
	}else{
		showInnerTicket.style.display = "none";
	}	
}

function removeTicket(data){
	var removeTicketContainer = document.getElementById(data);

	var s = ticketArray.indexOf(data); 

	if(s == 0)
	{
		for(var x = 1 ; x <ticketArray.length ; x++)
		{
			//div 
			var ticketdiv = document.getElementById("ticket_" + x)
			ticketdiv.id = "ticket_" + (x-1);
			//link for remove ticket
			var removeticket = document.getElementById("removeticket" + x)
			removeticket.setAttribute('onclick','removeTicket("ticket_'+(x-1)+'")');
			removeticket.id ="removeticket" + (x-1);
			//lin for show ticket
			var showticket = document.getElementById("showticket" + x);
			showticket.setAttribute('onclick','showTicketBox("box'+(x-1)+'")');
			showticket.id = "showticket" + (x-1);
			//ticket type 
			var tickettype = document.getElementById("ticketType" + x);
			tickettype.name = "ticket_type" + (x-1);
			tickettype.id = "ticketType" + (x-1);

			//ticket price 
			var ticketprice = document.getElementById("ticket_price" + x);
			ticketprice.name =  "ticket_price" + (x-1);
			ticketprice.id =  "ticket_price" + (x-1);

			//ticket title 
			var tickett = document.getElementById("ticket_title" + x);
			tickett.name =  "ticket_title" + (x-1);
			tickett.id =  "ticket_title" + (x-1);

			//ticket title 
			var ticketdes = document.getElementById("ticket_description" + x);
			ticketdes.name =  "ticket_description" + (x-1);
			ticketdes.id =  "ticket_description" + (x-1);

			//available_ticket
			var ticketav = document.getElementById("available_ticket" + x);
			ticketav.name =  "available_ticket" + (x-1);
			ticketav.id =  "available_ticket" + (x-1);
			//tickey start
			var ticketstart = document.getElementById("startDate" + x);
			ticketstart.name =  "ticket_start_date" + (x-1);
			ticketstart.id =  "startDate" + (x-1);

			//tickey send
			var ticketend = document.getElementById("endDate" + x);
			ticketend.name =  "ticket_end_date" + (x-1);
			ticketend.id =  "endDate" + (x-1);

		}
	}
	else
	{
		for(var x = (s + 1) ; x < ticketArray.length ; x++  )
		{
			//div 
			var ticketdiv = document.getElementById("ticket_" + x)
			ticketdiv.id = "ticket_" + (x-1);
			//link for remove ticket
			var removeticket = document.getElementById("removeticket" + x)
			removeticket.setAttribute('onclick','removeTicket("ticket_'+(x-1)+'")');
			removeticket.id ="removeticket" + (x-1);
			//lin for show ticket
			var showticket = document.getElementById("showticket" + x);
			showticket.setAttribute('onclick','showTicketBox("box'+(x-1)+'")');
			showticket.id = "showticket" + (x-1);
			//ticket type 
			var tickettype = document.getElementById("ticketType" + x);
			tickettype.name = "ticketType" + (x-1);
			tickettype.id = "ticketType" + (x-1);

			//ticket price 
			var ticketprice = document.getElementById("ticket_price" + x);
			ticketprice.name =  "ticket_price" + (x-1);
			ticketprice.id =  "ticket_price" + (x-1);

			//ticket title 
			var tickett = document.getElementById("ticket_title" + x);
			tickett.name =  "ticket_title" + (x-1);
			tickett.id =  "ticket_title" + (x-1);

			//ticket title 
			var ticketdes = document.getElementById("ticket_description" + x);
			ticketdes.name =  "ticket_description" + (x-1);
			ticketdes.id =  "ticket_description" + (x-1);

			//available_ticket
			var ticketav = document.getElementById("available_ticket" + x);
			ticketav.name =  "available_ticket" + (x-1);
			ticketav.id =  "available_ticket" + (x-1);
			//tickey start
			var ticketstart = document.getElementById("startDate" + x);
			ticketstart.name =  "ticket_start_date" + (x-1);
			ticketstart.id =  "startDate" + (x-1);

			//tickey send
			var ticketend = document.getElementById("endDate" + x);
			ticketend.name =  "ticket_end_date" + (x-1);
			ticketend.id =  "endDate" + (x-1);

		}
	}
	ticketArray.splice(s, 1);
	console.log(ticketArray);
	for(var x = 0 ; x < ticketArray.length ; x++)
	{
		ticketArray[x] = "ticket_" + x;
	}
	//county--;
	console.log(ticketArray);
	removeTicketContainer.remove();	
}

// Number only
function validateNumber(e){  
  var word = e;
  if((word.charCode >= 48 && word.charCode <= 57)){ // 0-9
    return true;
  }else{
    return false;
  }
}


