function myPrice(){	
	var val = document.getElementById('oriPrice').value;

    if (/^\s*$/g.test(val) || val.indexOf('\n') != -1) {
        document.getElementById("oriPrice").style.borderColor = "#f45342";
		document.getElementById('oriPrice').className += " 	formInvalid";
		document.getElementById("oriPrice").placeholder = "Price - Do not leave this empty";
    }else{
		if(val<0){
			document.getElementById("oriPrice").style.borderColor = "#f45342";
		}else{
			document.getElementById("oriPrice").style.borderColor = "#66afe9";
		}
	}
}

function myDiscount(){
	var discountValue = document.getElementById('textInput').value;
	
	if(/^\s*$/g.test(discountValue) || discountValue.indexOf('\n') != -1){
		document.getElementById("textInput").style.borderColor = "#f45342";
		document.getElementById('textInput').className += " 	formInvalid";
		document.getElementById("textInput").placeholder = "Discount Rate - Do not leave this empty";
	}else{
		if(discountValue>100){
			document.getElementById("textInput").style.borderColor = "#f45342";
			
		}else{
			document.getElementById("textInput").style.borderColor = "#66afe9";
			
		}
	}
}

function numberAndDot(e){
	document.getElementById('oriPrice').onkeypress = function (e) {
			// 46 is the keypress keyCode for period
				if (e.keyCode === 46 && this.value.split('.').length === 2) {
					return false;				
				}
			}
}

function numbersOnly(e){
	var input = e;
	
	if((input.charCode >= 48 && input.charCode <= 57)){ // 0-9
		return true;
	}else{
		return false;
	}
}

function readURL(input){
	
	var inputPicture = input.files[0];
	var inputPicture1 = String(inputPicture);
	var compare = "undefined";
	if(inputPicture1.localeCompare(compare)==0){
		document.getElementById("imageDiv").style.display = "none";
	}else{
		document.getElementById("imageDiv").style.display = "block";
		if(input.files && input.files[0]){
		var reader = new FileReader();
		
		reader.onload = function(e){
			$('#imgPreview')
				.attr('src', e.target.result)
		};
		reader.readAsDataURL(input.files[0]);
		}
	}
}

function readProURL(input){
	
	var inputPicture = input.files[0];
	var inputPicture1 = String(inputPicture);
	var compare = "undefined";
	if(inputPicture1.localeCompare(compare)==0){
		document.getElementById("imageDivs").style.display = "none";
	}else{
		document.getElementById("imageDivs").style.display = "block";
		if(input.files && input.files[0]){
		var reader = new FileReader();
		
		reader.onload = function(e){
			$('#imgPreviews')
				.attr('src', e.target.result)
		};
		reader.readAsDataURL(input.files[0]);
		}
	}
}

var expanded = false;
function showHideBox(){
	var count = 0;
	var checkedBoxes = document.getElementsByName("checkChecked");
	for(var i=0; i<checkedBoxes.length; i++){
		count++;
	}
	if(count==1){
		//cannot dropdown
	}else{
	  var checkboxes = document.getElementById("locationDropDown");
	  if (!expanded) {
		$(checkboxes).slideDown("slow");
		//checkboxes.style.display = "block";
		expanded = true;
	  } else {
		$(checkboxes).slideUp("slow");
		//checkboxes.style.display = "none";
		expanded = false;
	  }
	}
	
}

var recheckingCheckbox;
var recheckText="";
function checkMe(){
	var checkedBoxes = document.getElementsByName("checkChecked");
	var checkBoxChecked = [];
	var sentence = "";
	
	for(var i=0; i<checkedBoxes.length; i++){
		if(checkedBoxes[i].checked){
			recheckingCheckbox = "check"+i;
			recheckText = checkedBoxes[i];
			checkBoxChecked.push(checkedBoxes[i]);
			sentence = sentence + checkedBoxes[i].value + ",";
		}
	}
	
	//console.log(checkedBoxes[0].value);
	var updateOption = document.getElementById("selected");
	var finalizeSentence = sentence.lastIndexOf(",");
	sentence = sentence.substring(0, finalizeSentence) + sentence.substring(finalizeSentence + 1);
	updateOption.text = sentence;
	
	if(updateOption.value==""){
		//alert("Cannot leave location empty!");
		document.getElementById(recheckingCheckbox).checked = true;
		updateOption.text = recheckText.value;
	}
}



/*$(document).ready(function(){
	var date_input=$('input[id="startDate"]'); //our date input has the name "date"
	var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
	var options={
	format: 'yyyy-mm-dd',
	container: container,
	todaysHighlight: true,
	autoclose: true,
	startDate: new Date()
 };
  date_input.datepicker(options);
});*/



    $("#eventStartDate").ready(function() {
        var date_input=$('input[id="eventStartDate"]'); //our date input has the name "date"
		var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
		var options={
		format: 'yyyy-mm-dd',
		container: container,
		todaysHighlight: true,
		autoclose: true,
		startDate: new Date()
	 };
	  date_input.datepicker(options);
    });


    $("#eventEndDate").ready(function() {
        var date_input=$('input[id="eventEndDate"]'); //our date input has the name "date"
		var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
		var options={
		format: 'yyyy-mm-dd',
		container: container,
		todaysHighlight: true,
		autoclose: true,
		startDate: new Date()
	 };
	  date_input.datepicker(options);
    });

function changeDate(){
	var getStartDate = document.getElementById("eventStartDate");
	$('#eventEndDate').datepicker('setStartDate', getStartDate.value);
	$('#eventEndDate').removeAttr("disabled");
}

/*$(document).ready(function(){
	var date_input=$('input[id="endDate"]'); //our date input has the name "date"
	var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
	var todaysDate = new Date();
		
	var options={
	format: 'yyyy-mm-dd',
	container: container,
	todaysHighlight: true,
	autoclose: true,
	startDate: todaysDate,
 };
  date_input.datepicker(options);
});*/


function SignOut(){
	console.log("ddd");
	console.log("Logout");	
	firebase.auth().signOut().then(function() {
 	localStorage.clear();
	console.log("Sign out Success");
		$.post(window.location.href,{Signout: "yes"}, function(data){
          	window.location = data.redirect;
          });
	}).catch(function(error) {
	});
}












