function navbarLink(inputID){
	var selectedLink = document.getElementById(inputID);
	if(inputID == "myPostNav"){
		var anoterLink = document.getElementById("collaborateNav");
		if(selectedLink.className == "col-xs-6 col-sm-6 col-md-6 col-lg-6 active"){
		}
		else{
			selectedLink.className = "col-xs-6 col-sm-6 col-md-6 col-lg-6 active";
			anoterLink.className = "col-xs-6 col-sm-6 col-md-6 col-lg-6";
			$("#MyCollaborationDiv").fadeOut("fast", function(){
				$("#MyPostDiv").fadeIn("fast");
			});
		}
	}
	else
	{
		var anoterLink = document.getElementById("myPostNav");
		if(selectedLink.className == "col-xs-6 col-sm-6 col-md-6 col-lg-6 active"){
		}
		else{
			selectedLink.className = "col-xs-6 col-sm-6 col-md-6 col-lg-6 active";
			anoterLink.className = "col-xs-6 col-sm-6 col-md-6 col-lg-6";

			$("#MyPostDiv").fadeOut("fast", function(){
				$("#MyCollaborationDiv").fadeIn("fast");
			});
		}
	}
}