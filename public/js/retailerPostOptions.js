function switchFunction(switches,container){
	/*var switchStatus = document.getElementById("ticketSwitch").checked;
	var mainContainer = document.getElementById("ticketMainContainer");*/
	var switchStatus = document.getElementById(switches).checked;
	var mainContainer = document.getElementById(container);


	if(switchStatus == true){
		$(mainContainer).slideDown();
	}else{
		$(mainContainer).slideUp();
	}
}
