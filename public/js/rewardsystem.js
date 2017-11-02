var county = 0;
var RewardArry = [];

$(document).ready(function(){
	county = 0;
	
});
/*\''+'reward_'+reward_count+'\'*/
function AddReward(){
	var RewardText;
	var reward_count =RewardArry.length ;
	console.log(RewardArry.length);
	var rewardContainer = document.getElementById("Reward_Container");
	var addRewardHTML ='<div class="panel panel-default panel-body" id="reward_'+reward_count+'">'
					  +'<a class="pull-right" style="font-size:20px;" id = "rewardlink_'+reward_count+'" onclick="removeReward(\''+'reward_'+reward_count+'\')"><span class="glyphicon glyphicon-remove-sign fa-lg"></span></a>'
					  +'<label>Reward</label>'
					  +'<a class="pull-right" style="margin-right:10px; margin-top:3px;" id= "rewardlink_s'+reward_count+'" onclick="showRewardBox(\''+'boxx'+reward_count+'\')">Edit</a>'
					  +'<div class="container-fluid" id="boxx'+reward_count+'" style="display: none"><hr>'
					  +'<label>Reward Points</label><input class="form-control" type="text" id="reward_cost'+reward_count+'" onkeypress="return validateNumber(event)" name="reward_cost'+reward_count+'"/><br>'
					  +'<label>Reward name</label><input class="form-control" type="text" id="reward_name'+reward_count+'" name="reward_name'+reward_count+'"/><br>'  
					  +'<label>Reward Picture</label><input type="file" id="rewardpic'+reward_count+'" name="files" onchange="readrewardURL(\''+'rewardpic'+reward_count+'\' , \''+'imageDiv'+reward_count+'\' , \''+'imgPreview'+reward_count+'\');"/><br>'
					  +'<div class="panel panel-default" id="imageDiv'+reward_count+'" style="display:none;">'
					  +'<div class="panel-body" style="display: flex; justify-content: center;">'
					  +'<img id="imgPreview'+reward_count+'" class="img-responsive" src="#" style="max-height:500px;" alt="No picture selected">'
					  +'</div></div>'
					  +'<label>Reward Description</label><input class="form-control" type="text" id="reward_description'+reward_count+'" name="reward_description'+reward_count+'"/><br>'
					  +'</div>';

						RewardText = "reward_" + reward_count;
						RewardArry.push(RewardText);
						console.log(RewardArry);
	$(addRewardHTML).hide().appendTo(rewardContainer).fadeIn(500);
						
}

function showRewardBox(boxNumber){
	var showInnerTicket = document.getElementById(boxNumber);
	if(showInnerTicket.style.display == "none"){
		showInnerTicket.style.display = "block";
	}else{
		showInnerTicket.style.display = "none";
	}	
}

function removeReward(data){
	var rewardindex = data.split("_");
	console.log(rewardindex[1]);
	var s = RewardArry.indexOf(data); 
	var removeTicketContainer = document.getElementById(data);
	console.log("index: " + s);
	console.log(document.getElementById("reward_cost" + s));
	if(s == 0)
	{
		for(var x = 1 ; x <RewardArry.length ; x++)
		{
			//div 
			var chgdiv = document.getElementById("reward_" + x);
			console.log("after");
			console.log(chgdiv);
			chgdiv.id = "reward_" + (x-1);
			console.log("before");
			console.log(chgdiv);
			//rewardlink
			var chglink = document.getElementById("rewardlink_" + x);
			chglink.setAttribute('onclick','removeReward("reward_'+(x-1)+'")');
			chglink.id = "rewardlink_" + (x-1);

			//div box
			var chgdivbox = document.getElementById("boxx" + x);
			chgdivbox.id = "boxx" + (x-1);

			// link show
			var chgrewardlink_s = document.getElementById("rewardlink_s" + x);
			chgrewardlink_s.setAttribute('onclick','showRewardBox("boxx'+(x-1)+'")');
			chgrewardlink_s.id = "rewardlink_s" + (x-1);


			//reward_cost
			var chgrewardcost = document.getElementById("reward_cost" + x);
			chgrewardcost.name = "reward_cost" + (x-1);
			chgrewardcost.id = "reward_cost" + (x-1);

			//reward_name
			var chgrewardname = document.getElementById("reward_name" + x);
			chgrewardname.name = "reward_name" + (x-1);
			chgrewardname.id = "reward_name" + (x-1);

			//reward_pic
			var chgrewardpic = document.getElementById("rewardpic" + x);
			chgrewardpic.setAttribute('onchange','readrewardURL("rewardpic'+(x-1)+'",imageDiv'+(x-1)+',imgPreview'+(x-1)+')');
			chgrewardpic.id = "rewardpic" + (x-1);
			
			//imageDiv
			var chgimagediv = document.getElementById("imageDiv" + x);
			chgimagediv.id = "imageDiv" + (x-1);

			//imgPreview
			var chgimgp = document.getElementById("imgPreview" + x);
			chgimgp.id = "imgPreview" + (x-1);

			//reward_description
			var chgreward_des = document.getElementById("reward_description" + x);
			chgreward_des.name = "reward_description" + (x-1);
			chgreward_des.id = "reward_description" + (x-1);
			
			
		}
	}
	else
	{
		for(var x = (s + 1) ; x < RewardArry.length ; x++ )
		{
		//div 
		if((x-1) > 0)
		{
			//div 
			var chgdiv = document.getElementById("reward_" + x);
			console.log("after");
			console.log(chgdiv);
			chgdiv.id = "reward_" + (x-1);
			console.log("before");
			console.log(chgdiv);
			//rewardlink
			var chglink = document.getElementById("rewardlink_" + x);
			chglink.setAttribute('onclick','removeReward("reward_'+(x-1)+'")');
			chglink.id = "rewardlink_" + (x-1);

			//div box
			var chgdivbox = document.getElementById("boxx" + x);
			chgdivbox.id = "boxx" + (x-1);

			// link show
			var chgrewardlink_s = document.getElementById("rewardlink_s" + x);
			chgrewardlink_s.setAttribute('onclick','showRewardBox("boxx'+(x-1)+'")');
			chgrewardlink_s.id = "rewardlink_s" + (x-1);
			console.log(chgrewardlink_s);

			//reward_cost
			var chgrewardcost = document.getElementById("reward_cost" + x);
			chgrewardcost.id = "reward_cost" + (x-1);
			chgrewardcost.name = "reward_cost" + (x-1);
			//reward_name
			var chgrewardname = document.getElementById("reward_name" + x);
			chgrewardname.name = "reward_name" + (x-1);
			chgrewardname.id = "reward_name" + (x-1);

			//reward_pic
			var chgrewardpic = document.getElementById("rewardpic" + x);
			chgrewardpic.setAttribute('onchange','readrewardURL("rewardpic'+(x-1)+'",imageDiv'+(x-1)+',imgPreview'+(x-1)+')');
			chgrewardpic.id = "rewardpic" + (x-1);

			//imageDiv
			var chgimagediv = document.getElementById("imageDiv" + x);
			chgimagediv.id = "imageDiv" + (x-1);

			//imgPreview
			var chgimgp = document.getElementById("imgPreview" + x);
			chgimgp.id = "imgPreview" + (x-1);

			//reward_description
			var chgreward_des = document.getElementById("reward_description" + x);
			chgreward_des.id = "reward_description" + (x-1);
			chgreward_des.name = "reward_description" + (x-1);
		}
	}
}
removeTicketContainer.remove();
	//Remove & re
	RewardArry.splice(s, 1);
	console.log(RewardArry);
	for(var x = 0 ; x < RewardArry.length ; x++)
	{
		RewardArry[x] = "reward_" + x;
	}
	//county--;
	console.log(RewardArry);

}

function readrewardURL(input,input2,input3)
{
	
	var rewardpic = document.getElementById(input);
	console.log(input);
	var imgPreview = document.getElementById(input3);
	//var rewardpic = document.getElementById(input);
	var inputPicture = rewardpic.files[0];
	var inputPicture1 = String(inputPicture);
	var compare = "undefined";
	if(inputPicture1.localeCompare(compare)==0){
		document.getElementById(input2).style.display = "none";
	}else{
		console.log("ddd");
		document.getElementById(input2).style.display = "block";
		if(rewardpic.files && rewardpic.files[0]){
		var reader = new FileReader();
			
		reader.onload = function(e){
			$(imgPreview)
				.attr('src', e.target.result)
		};
		reader.readAsDataURL(rewardpic.files[0]);
		}
	}
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


