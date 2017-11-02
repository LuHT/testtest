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

function navbarLink(inputID){
	var selectedLink = document.getElementById(inputID);
	if(inputID == "myPostNav"){
		var anoterLink = document.getElementById("collaborateNav");
		var anoterLink2 = document.getElementById("explorePostNav");
		
			selectedLink.className = "col-xs-4 col-sm-4 col-md-4 col-lg-4 active";
			anoterLink.className = "col-xs-4 col-sm-4 col-md-4 col-lg-4";
			anoterLink2.className = "col-xs-4 col-sm-4 col-md-4 col-lg-4";
			
			$("#MyPostDiv").slideDown("slow");
			$("#MyCollaborationDiv").slideUp("fast");
			$("#MyExploreDiv").slideUp("fast");
			
		
	}else if(inputID == "collaborateNav"){
		var anoterLink = document.getElementById("myPostNav");
		var anoterLink2 = document.getElementById("explorePostNav");
		
			selectedLink.className = "col-xs-4 col-sm-4 col-md-4 col-lg-4 active";
			anoterLink.className = "col-xs-4 col-sm-4 col-md-4 col-lg-4";
			anoterLink2.className = "col-xs-4 col-sm-4 col-md-4 col-lg-4";
			
			$("#MyCollaborationDiv").slideDown("slow");
			$("#MyPostDiv").slideUp("fast");
			$("#MyExploreDiv").slideUp("fast");
	}else{
		var anoterLink = document.getElementById("myPostNav");
		var anoterLink2 = document.getElementById("collaborateNav");
		
			selectedLink.className = "col-xs-4 col-sm-4 col-md-4 col-lg-4 active";
			anoterLink.className = "col-xs-4 col-sm-4 col-md-4 col-lg-4";
			anoterLink2.className = "col-xs-4 col-sm-4 col-md-4 col-lg-4";
			
			$("#MyExploreDiv").slideDown("slow");
			$("#MyPostDiv").slideUp("fast");
			$("#MyCollaborationDiv").slideUp("fast");
	}
}