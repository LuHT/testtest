var counti = 0;
var SurveyArry = [];
$(document).ready(function(){
	counti = 0;
});

function addInputTextQuestion(){
	var survey_type;
	var survey_count =SurveyArry.length ;
	/*var createSurvey = document.getElementById("surveyContainer");
	createSurvey.innerHTML += '<div class="row" id="Q'+counti+'" style="box-shadow:-1px 4px 44px 2px rgba(153,153,153,1);">'
							+ '<div class="container-fluid" id="preview_Q_'+counti+'">'
							+ '<a class="glyphicon glyphicon-pencil pull-right" onclick="editQuestion(\''+'edit_Q_'+counti+'\')" style="margin-top:10px;"></a><h4 id="title_Q_'+counti+'">Question</h4>'
							+ '<h5 style="border-bottom: 1px solid grey; color:grey">Short answer-text</h5><hr></div>'
							+ '<div class="container-fluid" id="edit_Q_'+counti+'" style="display:none">'
							+ '<input class="form-control" id="input_Q_'+counti+'" type="text" name="shortanswer_q_'+counti+'"/><br>'
							+ '<a class="btn btn-primary pull-right" onclick="editQuestionDone(\''+'edit_Q_'+counti+'\');">Done</a></div></div><br>';
*/

	var innerShortAnswer = '<div class="row" id="Q'+survey_count+'" style="box-shadow:-1px 4px 10px 2px rgba(153,153,153,1); border-radius:5px; padding-bottom:20px; margin-bottom:15px;">'
						+ '<div class="container-fluid" id="preview_Q_'+survey_count+'">'
						+ '<a class="glyphicon glyphicon-pencil pull-right" id= "Q_edit'+survey_count+'" onclick="editQuestion(\''+'Q_'+survey_count+'\')" style="margin-top:10px;"></a><a class="glyphicon glyphicon-trash pull-right"  id = "Q_delete'+survey_count+'" onclick="deleteQuestion(\''+'Q'+survey_count+'\');" style="margin-top:10px; margin-right:10px;"></a><h4 id="title_Q_'+survey_count+'">Question</h4>'
						+ '<h5 style="border-bottom: 1px solid grey; color:grey">Short answer-text</h5></div>'
						+ '<div class="container-fluid" id="edit_Q_'+survey_count+'" style="display:none">'
						+ '<hr>'
						+ '<label>Edit Question Title</label>'
						+ '<input class="form-control" id="input_Q_'+survey_count+'" type="text" name="shortanswer_q_'+survey_count+'"/><br>'
						+ '<a class="btn btn-primary pull-right" id = "edit_input_Q_'+survey_count+'" onclick="editQuestionDone(\''+'Q_'+survey_count+'\');">Done</a></div></div>';
						survey_type = "shortanswer_Q" + survey_count;

						SurveyArry.push(survey_type);
						console.log(SurveyArry);

	$(innerShortAnswer).hide().appendTo("#surveyContainer").slideDown(100);
}

function editQuestion(panelID){
	var previewQuestionID = "preview_"+panelID;
	var previewQuestionDiv = document.getElementById(previewQuestionID);

	var editQuestionID = "edit_"+panelID;
	var editQuestionDiv = document.getElementById(editQuestionID);
	/*editQuestionDiv.style.display = "block";*/
	$(previewQuestionDiv).slideUp();
	$(editQuestionDiv).slideDown();
}

function editQuestionDone(panelID){
	var editQuestionID = "edit_"+panelID
	var editQuestionTitleID = "title_"+panelID;
	var editQuestionTitleInput = "input_"+panelID;

	var previewQuestionID = "preview_"+panelID;
	var previewQuestionDiv = document.getElementById(previewQuestionID);

	var editQuestionDiv = document.getElementById(editQuestionID);
	var changeQuestionTitle = document.getElementById(editQuestionTitleID);
	var questionTitleInput = document.getElementById(editQuestionTitleInput);

	if(questionTitleInput.value == ""){
		changeQuestionTitle.innerHTML = changeQuestionTitle.innerHTML;
	}else{
		changeQuestionTitle.innerHTML = questionTitleInput.value;
	}
	/*editQuestionDiv.style.display = "none";*/
	$(previewQuestionDiv).slideDown();
	$(editQuestionDiv).slideUp();
}

function addCheckboxQuestion(){


	var survey_type;
	var survey_count =SurveyArry.length ;
	var innerCheckbox = '<div class="row" id="Q'+survey_count+'" style="box-shadow:-1px 4px 10px 2px rgba(153,153,153,1); border-radius:5px; padding-bottom:20px; margin-bottom:15px;">'
					+ '<div class="container-fluid" id="preview_Q_'+survey_count+'">'
					+ '<a class="glyphicon glyphicon-pencil pull-right" id= "Q_edit'+survey_count+'" onclick="editQuestion(\''+'Q_'+survey_count+'\')" style="margin-top:10px;"></a><a class="glyphicon glyphicon-trash pull-right"  id = "Q_delete'+survey_count+'" onclick="deleteQuestion(\''+'Q'+survey_count+'\');" style="margin-top:10px; margin-right:10px;"></a><h4 id="title_Q_'+survey_count+'">Question</h4>'
					+ '<div id="checkboxfield'+survey_count+'">'
					+ '<input type="checkbox" disabled="disabled" id="checkboxchoicep_q_'+survey_count+'_input_1" style="margin-right:5px"><span id="checkboxchoiceSpan_q_'+survey_count+'_input_1">Option...</span><br>'
					+ '</div></div>'
					+ '<div class="container-fluid" id="edit_Q_'+survey_count+'" style="display:none">'
					+ '<hr>'
					+ '<label>Edit Question Title</label>'
					+ '<input class="form-control" id="input_Q_'+survey_count+'" type="text" name="checkboxchoice_q_'+survey_count+'"/><br>'
					+ '<div id="addMoreCheckboxField'+survey_count+'">'
					+ '<label id="checkboxLabel_q_'+survey_count+'_input_1">Checkbox_1</label>'
					+ '<input class="form-control" style="margin-bottom:15px;" id="checkboxchoice_q_'+survey_count+'_input_1" onchange="updateOption(\''+'checkboxchoice_q_'+survey_count+'_input_1\')" type="text" name="checkboxchoice_q_'+survey_count+'_input_1"/>'
					+ '</div>'
					+ '<a id = "addCheck'+survey_count+'" onclick="addCheckBoxtoField(\''+'addMoreCheckboxField'+survey_count+'\')">Add checkbox..</a><br>'
					+ '<a id = "deleteCheck'+survey_count+'" onclick="deleteCheckBoxtoField(\''+'addMoreCheckboxField'+survey_count+'\')">Remove checkbox..</a>'
					+ '<a class="btn btn-primary pull-right" id = "edit_input_Q_'+survey_count+'" onclick="editQuestionDone(\''+'Q_'+survey_count+'\');">Done</a></div></div>';
					survey_type = "checkboxchoice_Q" + survey_count;
					SurveyArry.push(survey_type);
					console.log(SurveyArry);
	$(innerCheckbox).hide().appendTo("#surveyContainer").slideDown(100);
}

function addCheckBoxtoField(divPosition){
	/*checkboxcounti, divPosition*/
	var lastInputName = $('#'+divPosition+' input').last().attr('name');
	var splitLine = lastInputName.split("_");
	var getLastInputNo = splitLine[4];
	var getQuestionNo = splitLine[2];
	var nextcounti = parseInt(getLastInputNo) + 1;
	var addCheckboxHTML = document.getElementById(divPosition);
	var checkboxfieldPreviewID = "checkboxfield"+getQuestionNo;
	var checkboxfieldPreview = document.getElementById(checkboxfieldPreviewID);

	var addNewInnerCheckboxInput = '<label id="checkboxLabel_q_'+getQuestionNo+'_input_'+nextcounti+'">Checkbox_'+nextcounti+'</label>'
				+ '<input class="form-control" style="margin-bottom:15px;" id="checkboxchoice_q_'+getQuestionNo+'_input_'+nextcounti+'" type="text" onchange="updateOption(\''+'checkboxchoice_q_'+getQuestionNo+'_input_'+nextcounti+'\')" name="checkboxchoice_q_'+getQuestionNo+'_input_'+nextcounti+'"/>';
	
	$(addNewInnerCheckboxInput).hide().appendTo(addCheckboxHTML).fadeIn(500);

	var addChecboxInputPreview = '<input type="checkbox" disabled="disabled" id="checkboxchoicep_q_'+getQuestionNo+'_input_'+nextcounti+'" style="margin-right:5px"><span id="checkboxchoiceSpan_q_'+getQuestionNo+'_input_'+nextcounti+'">Option...<br></span>'
	$(addChecboxInputPreview).hide().appendTo(checkboxfieldPreview).fadeIn(500);
}

function deleteCheckBoxtoField(divPosition){
	var lastInputName = $('#'+divPosition+' input').last().attr('name');
	var splitLine = lastInputName.split("_");
	var getLastInputNo = splitLine[4];
	var getQuestionNo = splitLine[2];

	var checkboxParent = document.getElementById(divPosition);
	var checkboxID = "checkboxchoice_q_"+getQuestionNo+"_input_"+getLastInputNo;
	var checkboxInput = document.getElementById(checkboxID);
	var checkboxLabelID = "checkboxLabel_q_"+getQuestionNo+'_input_'+getLastInputNo;
	var getCheckboxLabel = document.getElementById(checkboxLabelID);

	var checkboxfieldPreviewID = "checkboxfield"+getQuestionNo;
	var checkboxfieldPreview = document.getElementById(checkboxfieldPreviewID);

	var previewCheckbox  = document.getElementById("checkboxchoicep_q_"+getQuestionNo+"_input_"+getLastInputNo);
	var previewCheckboxSpan = document.getElementById("checkboxchoiceSpan_q_"+getQuestionNo+"_input_"+getLastInputNo);
	if(getLastInputNo==1){

		alert("cannot delete default question");

	}else{

		$("#"+checkboxLabelID).fadeOut(200, function(){
		checkboxParent.removeChild(getCheckboxLabel);
		});	

		$("#"+checkboxID).slideUp(500, function(){
			checkboxParent.removeChild(checkboxInput);
		});

		checkboxfieldPreview.removeChild(previewCheckbox);
		checkboxfieldPreview.removeChild(previewCheckboxSpan);
	}

	
}

function updateOption(input){
	var splitLine = input.split("_");
	var questionNo = splitLine[2];
	var inputNo = splitLine[4];

	var checkboxInputID = "checkboxchoice_q_"+questionNo+"_input_"+inputNo;
	var checkboxInput = document.getElementById(checkboxInputID);
	var spanID = "checkboxchoiceSpan_q_"+questionNo+"_input_"+inputNo;
	var changeSpan = document.getElementById(spanID);
	changeSpan.innerHTML = checkboxInput.value;
}

function addMultichoiceQuestion(){
	var survey_type;
	var survey_count =SurveyArry.length ;
	var innerMulti = '<div class="row" id="Q'+survey_count+'" style="box-shadow:-1px 4px 10px 2px rgba(153,153,153,1); border-radius:5px; padding-bottom:20px; margin-bottom:15px;">'
					+ '<div class="container-fluid" id="preview_Q_'+survey_count+'">'
					+ '<a class="glyphicon glyphicon-pencil pull-right" id= "Q_edit'+survey_count+'" onclick="editQuestion(\''+'Q_'+survey_count+'\')" style="margin-top:10px;"></a><a class="glyphicon glyphicon-trash pull-right"  id = "Q_delete'+survey_count+'" onclick="deleteQuestion(\''+'Q'+survey_count+'\');" style="margin-top:10px; margin-right:10px;"></a><h4 id="title_Q_'+survey_count+'">Question</h4>'
					+ '<div id="multifield'+survey_count+'">'
					+ '<input type="radio" disabled="disabled" id="multichoicep_q_'+survey_count+'_input_1" style="margin-right:5px"><span id="multichoiceSpan_q_'+survey_count+'_input_1">Option...<br></span>'
					+ '</div></div>'
					+ '<div class="container-fluid" id="edit_Q_'+survey_count+'" style="display:none">'
					+ '<hr>'
					+ '<label>Edit Question Title</label>'
					+ '<input class="form-control" id="input_Q_'+survey_count+'" type="text" name="multichoice_q_'+survey_count+'"/><br>'
					+ '<div id="addMoreRadioField'+survey_count+'">'
					+ '<label id="radioLabel_q_'+survey_count+'_input_1">Radio_1</label>'
					+ '<input class="form-control" id="multichoice_q_'+survey_count+'_input_1" onchange="updateMultiOption(\''+'multichoice_q_'+survey_count+'_input_1\')" type="text" name="multichoice_q_'+survey_count+'_input_1"/>'
					+ '</div>'
					+ '<a id= "addRadio'+survey_count+'" onclick="addRadiotoField(\''+'addMoreRadioField'+survey_count+'\')">Add Radio Input..</a><br>'
					+ '<a id= "deleteRadio'+survey_count+'" onclick="deleteRadio(\''+'addMoreRadioField'+survey_count+'\')">Delete Radio Input..</a>'
					+ '<a class="btn btn-primary pull-right" id = "edit_input_Q_'+survey_count+'" onclick="editQuestionDone(\''+'Q_'+survey_count+'\');">Done</a></div></div>';
					survey_type = "multichoice_Q" + survey_count;
					SurveyArry.push(survey_type);
					console.log(SurveyArry);
	$(innerMulti).hide().appendTo("#surveyContainer").slideDown(100);
	counti++; 
}

function addRadiotoField(divPosition){
	/*checkboxcounti, divPosition*/
	var lastInputName = $('#'+divPosition+' input').last().attr('name');
	var splitLine = lastInputName.split("_");
	var getLastInputNo = splitLine[4];
	var getQuestionNo = splitLine[2];
	var nextcounti = parseInt(getLastInputNo) + 1;
	var addRadioHTML = document.getElementById(divPosition);
	var radiofieldPreviewID = "multifield"+getQuestionNo;
	var radiofieldPreview = document.getElementById(radiofieldPreviewID);

	var addNewInnerRadioInput = '<label id="radioLabel_q_'+getQuestionNo+'_input_'+nextcounti+'">Radio_'+nextcounti+'</label>'
				+ '<input class="form-control" id="multichoice_q_'+getQuestionNo+'_input_'+nextcounti+'" type="text" onchange="updateMultiOption(\''+'multichoice_q_'+getQuestionNo+'_input_'+nextcounti+'\')" name="multichoice_q_'+getQuestionNo+'_input_'+nextcounti+'"/>';
	
	$(addNewInnerRadioInput).hide().appendTo(addRadioHTML).fadeIn(500);

	var addRadioInputPreview = '<input type="radio" disabled="disabled" id="multichoicep_q_'+getQuestionNo+'_input_'+nextcounti+'" style="margin-right:5px"><span id="multichoiceSpan_q_'+getQuestionNo+'_input_'+nextcounti+'">Option...<br></span>';
	$(addRadioInputPreview).hide().appendTo(radiofieldPreview).fadeIn(500);
}

function deleteRadio(divPosition){
	var lastInputName = $('#'+divPosition+' input').last().attr('name');
	var splitLine = lastInputName.split("_");
	var getLastInputNo = splitLine[4];
	var getQuestionNo = splitLine[2];

	var radioParent = document.getElementById(divPosition);
	var radioID = "multichoice_q_"+getQuestionNo+"_input_"+getLastInputNo;
	var radioInput = document.getElementById(radioID);
	var radioLabelID = "radioLabel_q_"+getQuestionNo+"_input_"+getLastInputNo;
	var getRadioLabel = document.getElementById(radioLabelID);

	var radiofieldPreviewID = "multifield"+getQuestionNo;
	var radiofieldPreview = document.getElementById(radiofieldPreviewID);

	var previewRadio  = document.getElementById("multichoicep_q_"+getQuestionNo+"_input_"+getLastInputNo);
	var previewRadioSpan = document.getElementById("multichoiceSpan_q_"+getQuestionNo+"_input_"+getLastInputNo);
	
	if(getLastInputNo==1){

		alert("cannot delete default question");

	}else{

		$("#"+radioLabelID).fadeOut(200, function(){
		radioParent.removeChild(getRadioLabel);
		});	

		$("#"+radioID).slideUp(500, function(){
			radioParent.removeChild(radioInput);
		});

		radiofieldPreview.removeChild(previewRadio);
		radiofieldPreview.removeChild(previewRadioSpan);
	}
}

function updateMultiOption(input){
	var splitLine = input.split("_");
	var questionNo = splitLine[2];
	var inputNo = splitLine[4];

	var radioInputID = "multichoice_q_"+questionNo+"_input_"+inputNo;
	var radioInput = document.getElementById(radioInputID);
	var spanID = "multichoiceSpan_q_"+questionNo+"_input_"+inputNo;
	var changeSpan = document.getElementById(spanID);
	changeSpan.innerHTML = radioInput.value;
}



function addDropdownQuestion(){
	var survey_type;
	var survey_count =SurveyArry.length ;
	var innerDropdown = '<div class="row" id="Q'+survey_count+'" style="box-shadow:-1px 4px 10px 2px rgba(153,153,153,1); border-radius:5px; padding-bottom:20px; margin-bottom:15px;">'
						+ '<div class="container-fluid" id="preview_Q_'+survey_count+'">'
						+ '<a class="glyphicon glyphicon-pencil pull-right" id= "Q_edit'+survey_count+'" onclick="editQuestion(\''+'Q_'+survey_count+'\')" style="margin-top:10px;"></a><a class="glyphicon glyphicon-trash pull-right" style="margin-top:10px; margin-right:10px;" id = "Q_delete'+survey_count+'" onclick="deleteQuestion(\''+'Q'+survey_count+'\');"></a><h4 id="title_Q_'+survey_count+'">Question</h4>'
						+ '<select type="text" class="form-control" id="select_Q_'+survey_count+'">'
						+ '<option id="select_q_'+survey_count+'_option_1">Option...</option>'
						+ '</select></div>'
						+ '<div class="container-fluid" id="edit_Q_'+survey_count+'" style="display:none">'
						+ '<hr>'
						+ '<label>Edit Question Title</label>'
						+ '<input class="form-control" id="input_Q_'+survey_count+'" type="text" name="select_q_'+survey_count+'"/>'
						+ '<div id="addMoreOptionField'+survey_count+'">'
						+ '<label id="optionLabel_q_'+survey_count+'_input_1">Option_1</label>'
						+ '<input class="form-control" id="select_q_'+survey_count+'_input_1" type="text" name="select_q_'+survey_count+'_input_1" onchange="updateSelectOption(\''+'select_q_'+survey_count+'_input_1\')"/>'
						+ '</div>'
						+ '<a onclick="addOptionstoSelect(\''+'select_q_'+survey_count+'_option_1\')">Add Options..</a><br>'
						+ '<a onclick="deleteSelectOption(\''+'select_q_'+survey_count+'_option_1\')">Remove Options..</a>'
						+ '<a class="btn btn-primary pull-right"  id = "edit_input_Q_'+survey_count+'" onclick="editQuestionDone(\''+'Q_'+survey_count+'\');">Done</a></div></div>';
						survey_type = "select_Q" + survey_count;
						SurveyArry.push(survey_type);
						console.log(SurveyArry);

	$(innerDropdown).hide().appendTo("#surveyContainer").slideDown(100);

}

function addOptionstoSelect(input){
	
	var splitLine = input.split("_");
	var questionNo = splitLine[2];

	var selectID = "select_Q_"+questionNo;
	var lastOptionID = $('#'+selectID+' option').last().attr('id');
	var getLastOptionNo = lastOptionID.split("_");
	var nextOptionNo = parseInt(getLastOptionNo[4]) + 1;
	var selectOption = document.getElementById(selectID);


	var newOptionHTML = '<option id="select_q_'+questionNo+'_option_'+nextOptionNo+'">Option...</option>';
	$(newOptionHTML).hide().appendTo(selectOption).fadeIn(500);

	var newOptionFieldid = "addMoreOptionField"+questionNo;
	var newOptionField = document.getElementById(newOptionFieldid);

	var newOptionHTMLedit = '<label id="optionLabel_q_'+questionNo+'_option_'+nextOptionNo+'">Option_'+nextOptionNo+'</label>'
						 + '<input class="form-control" id="select_q_'+questionNo+'_input_'+nextOptionNo+'" type="text" name="select_q_'+questionNo+'_input_'+nextOptionNo+'" onchange="updateSelectOption(\''+'select_q_'+questionNo+'_input_'+nextOptionNo+'\')"/>';

	$(newOptionHTMLedit).hide().appendTo(newOptionField).fadeIn(500);
}

function deleteSelectOption(input){
	var splitLine = input.split("_");
	var questionNo = splitLine[2];

	var selectID = "select_Q_"+questionNo;
	var lastOptionID = $('#'+selectID+' option').last().attr('id');
	var getLastOptionNo = lastOptionID.split("_");
	var lastOptionNo = getLastOptionNo[4];
	var optionField = document.getElementById("addMoreOptionField"+questionNo);
	var selectOption = document.getElementById(selectID);
	var selectOptionPreview = document.getElementById("select_q_"+questionNo+"_option_"+lastOptionNo);
	var selectOptionInput = document.getElementById("select_q_"+questionNo+"_input_"+lastOptionNo);
	var selectOptionLabel = document.getElementById("optionLabel_q_"+questionNo+"_option_"+lastOptionNo);

	if(lastOptionNo==1){

			alert("Canot remove default option");
	}else{

		$("#optionLabel_q_"+questionNo+"_option_"+lastOptionNo).fadeOut(200, function(){
			optionField.removeChild(selectOptionLabel);
		});	

		$("#select_q_"+questionNo+"_input_"+lastOptionNo).fadeOut(200, function(){
			optionField.removeChild(selectOptionInput);
		});	

		selectOption.removeChild(selectOptionPreview);
	}

}

function updateSelectOption(input){
	var splitLine = input.split("_");
	var questionNo = splitLine[2];
	var optionNo = splitLine[4];

	var optionID = "select_q_"+questionNo+"_option_"+optionNo;
	var optionInput = document.getElementById(input);
	var selectOption = document.getElementById(optionID);
	selectOption.innerHTML = optionInput.value;
}

function deleteQuestion(questionID){
	var parentDIV = document.getElementById("surveyContainer");
	var childDIV = document.getElementById(questionID);
	var QuestionArray = [];
	var QuestionType = [];
	for(var x = 0 ; x < SurveyArry.length ; x++)
	{
		var text = SurveyArry[x].split("_");
		QuestionArray.push(text[1]);
		QuestionType.push(text[0]);
	}
	var QuestionIndex = QuestionArray.indexOf(questionID);
/*
	$('#Q0').find('input').each(function () {
    console.log(this.name);
});*/

if(QuestionIndex == 0)
{
		for(var x = 1 ; x < SurveyArry.length ; x++)
		{
			//Question Div
			var QuestionDiv = document.getElementById("Q"+ x);
			QuestionDiv.id = "Q" + (x-1);
			//Question Div Preview
			var QuestionDiv_preview = document.getElementById("preview_Q_" + x);
			QuestionDiv_preview.id = "preview_Q_" + (x-1);
			//Question Div Del
			var QuestionDel = document.getElementById("Q_delete" + x);
			QuestionDel.setAttribute('onclick','deleteQuestion("Q'+(x-1)+'")');
			QuestionDel.id = "Q_delete" + (x-1);
			//Question Div Edit
			var QuestionEd = document.getElementById("Q_edit" + x)
			QuestionEd.setAttribute('onclick','editQuestion("Q'+(x-1)+'")');
			QuestionEd.id = "Q_edit" + (x-1);
			//QuestionTittle
			var QuestionTittle = document.getElementById("title_Q_" + x)
			QuestionTittle.id = "title_Q_" + (x-1);

			var Questionedit = document.getElementById("edit_Q_" + x)
			Questionedit.id = "edit_Q_" + (x-1);
			//check type
			if(QuestionType[x] == "shortanswer")
			{
				var input =  document.getElementById("input_Q_" + x);
				input.id = "input_Q_" + (x-1);
				input.name = "shortanswer_q_" + (x-1);

				var editinput = document.getElementById("edit_input_Q_" + x);
				editinput.setAttribute('onclick','editQuestionDone("Q_'+(x-1)+'")');
				editinput.id = "edit_input_Q_" + (x-1);
			}

			if(QuestionType[x] == "multichoice")
			{
				console.log("sss: ");
				var count_input = 0;
				var count_label = 0;
				var count_input_multi = 0;
				var count_span = 0;
				var input =  document.getElementById("input_Q_" + x);
				var mdiv = document.getElementById("addMoreRadioField" +x);
				input.id = "input_Q_" + (x-1);
				input.name = "multichoice_q_" + (x-1);
				$('#addMoreRadioField' + x).find('input').each(function () {
   				 	count_input++;
				});
				$('#addMoreRadioField' + x).find('label').each(function () {
   				 	count_label++;
				});
				$('#multifield' + x).find('input').each(function () {
   				 	count_input_multi++;
				});
				$('#multifield' + x).find('span').each(function () {
   				 	count_span++;
				});

				//for mutlifield
				var mutlidiv = document.getElementById("multifield" + x);
				for(var k = 1 ; k <count_span ; k++ )
				{
					var c = document.getElementById("multichoiceSpan_q_" + x + "_input_" + k);
				c.id = "multichoiceSpan_q_" + (x -1)+ "_input_" + k;
				}

				for(var h = 1 ; h <count_input_multi ; h++ )
				{
					var multichoicep = document.getElementById("multichoicep_q_" + x + "_input_" + h);
					multichoicep.id = "multichoicep_q_" + (x -1)+ "_input_" + h;
				}
				mutlidiv.id = "multifield" + (x-1);

				//for addMoreRadioField 
				for(var p = 1 ; p <count_label ; p++ )
				{
					var questionlabel = document.getElementById("radioLabel_q_" + x + "_input_" + p);
					questionlabel.id = "radiolable_q_" + (x -1)+ "_input_" + p;
				}
				for(var y = 1 ; y <= count_input ; y++)
				{
					var question_input = document.getElementById("multichoice_q_" + x + "_input_" + y);
					question_input.setAttribute('onchange','updateMultiOption("multichoice_q_'+(x-1)+'_input_'+y+'")');
					question_input.id = "multichoice_q_" + (x-1) + "_input_" + y;
					question_input.name = "multichoice_q_" + (x-1) + "_input_" + y;
				}
				mdiv.id = "addMoreRadioField" +(x-1);

				var editinput = document.getElementById("edit_input_Q_" + x);
				editinput.setAttribute('onclick','editQuestionDone("Q_'+(x-1)+'")');
				editinput.id = "edit_input_Q_" + (x-1);

				var addRadioL = document.getElementById("addRadio"+x);
				addRadioL.setAttribute('onclick','addRadiotoField("addMoreRadioField'+(x-1)+'")');
				addRadioL.id = "addRadio"+ (x-1);

				var deleteRadioL = document.getElementById("deleteRadio"+x);
				deleteRadioL.setAttribute('onclick','deleteRadio("addMoreRadioField'+(x-1)+'")');
				deleteRadioL.id = "deleteRadio"+ (x-1);
			}
			
			if(QuestionType[x] == "checkboxchoice")
			{
				var count_input = 0;
				var count_input_check = 0;
				var count_input_span = 0;
				var count_label = 0;
				var input =  document.getElementById("input_Q_" + x);
				var mdiv = document.getElementById("addMoreCheckboxField" +x);

				input.id = "input_Q_" + (x-1);
				input.name = "checkboxchoice_q_" + (x-1);
				$('#addMoreCheckboxField' + x).find('input').each(function () {
   				 	count_input++;
				});
				$('#addMoreCheckboxField' + x).find('label').each(function () {
   				 	count_label++;
				});
				$('#checkboxfield' + x).find('input').each(function () {
   				 	count_input_check++;
				});
				$('#checkboxfield' + x).find('span').each(function () {
   				 	count_input_span++;
				});


				//for checkfielddiv
				var checkfielddiv = document.getElementById("checkboxfield" +x);
				for(var k = 1 ; k < count_input_span ; k++ )
				{
						var c = document.getElementById("checkboxchoiceSpan_q_" + x + "_input_" + k);
						c.id = "checkboxchoiceSpan_q_" + (x -1)+ "_input_" + k;
				}
				for(var h = 1 ; h < count_input_check ; h++ )
				{
						var c = document.getElementById("checkboxchoicep_q_" + x + "_input_" + h);
						c.id = "checkboxchoicep_q_" + (x -1)+ "_input_" + h;
				}
				checkfielddiv.id = "checkboxfield" +(x-1);

				//for addMoreRadioField 
				for(var p = 1 ; p <count_label ; p++ )
				{
					var questionlabel = document.getElementById("checkboxLabel_q" + x + "_input_" + p);
					questionlabel.id = "checkboxLabel_q" + (x -1)+ "_input_" + p;
				}

				for(var y = 1 ; y <= count_input ; y++)
				{
					
					var question_input = document.getElementById("checkboxchoice_q_" + x + "_input_" + y);
					question_input.setAttribute('onchange','updateOption("checkboxchoice_q_'+(x-1)+'_input_'+y+'")');
					question_input.id = "checkboxchoice_q_" + (x-1) + "_input_" + y;
					question_input.name = "checkboxchoice_q_" + (x-1) + "_input_" + y;
				}

				mdiv.id = "addMoreCheckboxField" +(x-1);

				var editinput = document.getElementById("edit_input_Q_" + x);
				editinput.setAttribute('onclick','editQuestionDone("Q_'+(x-1)+'")');
				editinput.id = "edit_input_Q_" + (x-1);

				var addCheckL = document.getElementById("addCheck"+x);
				addCheckL.setAttribute('onclick','addCheckBoxtoField("addMoreCheckboxField'+(x-1)+'")');
				addCheckL.id = "addCheck"+ (x-1);

				var deleteCheckL = document.getElementById("deleteCheck"+x);
				deleteCheckL.setAttribute('onclick','deleteCheckBoxtoField("addMoreCheckboxField'+(x-1)+'")');
				deleteCheckL.id = "deleteCheck"+ (x-1);
			}

			if(QuestionType[x] == "select")
			{
				var count_input = 0;
				var count_option = 0;
				var count_label = 0;

				var input =  document.getElementById("input_Q_" + x);
				var mdiv = document.getElementById("addMoreOptionField" +x);
			
				input.id = "input_Q_" + (x-1);
				input.name = "select_q_" + (x-1);
				
				$('#select_Q_' + x).find('option').each(function () {
   				 	count_option++;
				});
				$('#addMoreOptionField' + x).find('input').each(function () {
   				 	count_input++;
				});
					$('#addMoreOptionField' + x).find('label').each(function () {
   				 	count_label++;
				});


				var selectoption = document.getElementById("select_Q_" + x);
				for(var j =1 ; j <= count_option ; j++)
				{
					var selectoption = document.getElementById("select_q_" +x+"_option_" + j);
					selectoption.id = "select_q_" + (x-1) +"_option_" + j
				}
				selectoption.id = "select_Q_" + (x-1);



				for(var y = 1 ; y <= count_input ; y++)
				{
					var question_input = document.getElementById("select_q_" + x + "_input_" + y);
					question_input.setAttribute('onchange','updateSelectOption("select_q_'+(x-1)+'_input_'+y+'")');
					question_input.id = "select_q_" + (x-1) + "_input_" + y;
					question_input.name = "select_q_" + (x-1) + "_input_" + y;
				}
				for(var k = 1 ; k <count_label ; k++)
				{
					var questionlabel = document.getElementById("optionLabel_q_"+ x +"_input_"+k);
					questionlabel.id = "optionLabel_q_"+ (x-1) +"_input_"+k
				}
				mdiv.id = "addMoreOptionField" +(x-1);

				var editinput = document.getElementById("edit_input_Q_" + x);
				editinput.setAttribute('onclick','editQuestionDone("Q_'+(x-1)+'")');
				editinput.id = "edit_input_Q_" + (x-1);
	
			}
		}
}
else
{
	for(var x = (QuestionIndex+1) ; x < SurveyArry.length ; x++)
	{
		if((x-1) > 0)
		{
						//Question Div
			var QuestionDiv = document.getElementById("Q"+ x);
			QuestionDiv.id = "Q" + (x-1);
			//Question Div Preview
			var QuestionDiv_preview = document.getElementById("preview_Q_" + x);
			QuestionDiv_preview.id = "preview_Q_" + (x-1);
			//Question Div Del
			var QuestionDel = document.getElementById("Q_delete" + x);
			QuestionDel.setAttribute('onclick','deleteQuestion("Q'+(x-1)+'")');
			QuestionDel.id = "Q_delete" + (x-1);
			//Question Div Edit
			var QuestionEd = document.getElementById("Q_edit" + x)
			QuestionEd.setAttribute('onclick','editQuestion("Q'+(x-1)+'")');
			QuestionEd.id = "Q_edit" + (x-1);
			//QuestionTittle
			var QuestionTittle = document.getElementById("title_Q_" + x)
			QuestionTittle.id = "title_Q_" + (x-1);

			var Questionedit = document.getElementById("edit_Q_" + x)
			Questionedit.id = "edit_Q_" + (x-1);
			//check type
			if(QuestionType[x] == "shortanswer")
			{
				var input =  document.getElementById("input_Q_" + x);
				input.id = "input_Q_" + (x-1);
				input.name = "shortanswer_q_" + (x-1);

				var editinput = document.getElementById("edit_input_Q_" + x);
				editinput.setAttribute('onclick','editQuestionDone("Q_'+(x-1)+'")');
				editinput.id = "edit_input_Q_" + (x-1);
			}

			if(QuestionType[x] == "multichoice")
			{
				console.log("sss: ");
				var count_input = 0;
				var count_label = 0;
				var count_input_multi = 0;
				var count_span = 0;
				var input =  document.getElementById("input_Q_" + x);
				var mdiv = document.getElementById("addMoreRadioField" +x);
				input.id = "input_Q_" + (x-1);
				input.name = "multichoice_q_" + (x-1);
				$('#addMoreRadioField' + x).find('input').each(function () {
   				 	count_input++;
				});
				$('#addMoreRadioField' + x).find('label').each(function () {
   				 	count_label++;
				});
				$('#multifield' + x).find('input').each(function () {
   				 	count_input_multi++;
				});
				$('#multifield' + x).find('span').each(function () {
   				 	count_span++;
				});

				//for mutlifield
				var mutlidiv = document.getElementById("multifield" + x);
				for(var k = 1 ; k <count_span ; k++ )
				{
					var c = document.getElementById("multichoiceSpan_q_" + x + "_input_" + k);
				c.id = "multichoiceSpan_q_" + (x -1)+ "_input_" + k;
				}

				for(var h = 1 ; h <count_input_multi ; h++ )
				{
					var multichoicep = document.getElementById("multichoicep_q_" + x + "_input_" + h);
					multichoicep.id = "multichoicep_q_" + (x -1)+ "_input_" + h;
				}
				mutlidiv.id = "multifield" + (x-1);

				//for addMoreRadioField 
				for(var p = 1 ; p <count_label ; p++ )
				{
					var questionlabel = document.getElementById("radioLabel_q_" + x + "_input_" + p);
					questionlabel.id = "radiolable_q_" + (x -1)+ "_input_" + p;
				}
				for(var y = 1 ; y <= count_input ; y++)
				{
					var question_input = document.getElementById("multichoice_q_" + x + "_input_" + y);
					question_input.setAttribute('onchange','updateMultiOption("multichoice_q_'+(x-1)+'_input_'+y+'")');
					question_input.id = "multichoice_q_" + (x-1) + "_input_" + y;
					question_input.name = "multichoice_q_" + (x-1) + "_input_" + y;
				}
				mdiv.id = "addMoreRadioField" +(x-1);

				var editinput = document.getElementById("edit_input_Q_" + x);
				editinput.setAttribute('onclick','editQuestionDone("Q_'+(x-1)+'")');
				editinput.id = "edit_input_Q_" + (x-1);

				var addRadioL = document.getElementById("addRadio"+x);
				addRadioL.setAttribute('onclick','addRadiotoField("addMoreRadioField'+(x-1)+'")');
				addRadioL.id = "addRadio"+ (x-1);

				var deleteRadioL = document.getElementById("deleteRadio"+x);
				deleteRadioL.setAttribute('onclick','deleteRadio("addMoreRadioField'+(x-1)+'")');
				deleteRadioL.id = "deleteRadio"+ (x-1);
			}
			
			if(QuestionType[x] == "checkboxchoice")
			{
				var count_input = 0;
				var count_input_check = 0;
				var count_input_span = 0;
				var count_label = 0;
				var input =  document.getElementById("input_Q_" + x);
				var mdiv = document.getElementById("addMoreCheckboxField" +x);

				input.id = "input_Q_" + (x-1);
				input.name = "checkboxchoice_q_" + (x-1);
				$('#addMoreCheckboxField' + x).find('input').each(function () {
   				 	count_input++;
				});
				$('#addMoreCheckboxField' + x).find('label').each(function () {
   				 	count_label++;
				});
				$('#checkboxfield' + x).find('input').each(function () {
   				 	count_input_check++;
				});
				$('#checkboxfield' + x).find('span').each(function () {
   				 	count_input_span++;
				});


				//for checkfielddiv
				var checkfielddiv = document.getElementById("checkboxfield" +x);
				for(var k = 1 ; k < count_input_span ; k++ )
				{
						var c = document.getElementById("checkboxchoiceSpan_q_" + x + "_input_" + k);
						c.id = "checkboxchoiceSpan_q_" + (x -1)+ "_input_" + k;
				}
				for(var h = 1 ; h < count_input_check ; h++ )
				{
						var c = document.getElementById("checkboxchoicep_q_" + x + "_input_" + h);
						c.id = "checkboxchoicep_q_" + (x -1)+ "_input_" + h;
				}
				checkfielddiv.id = "checkboxfield" +(x-1);

				//for addMoreRadioField 
				for(var p = 1 ; p <count_label ; p++ )
				{
					var questionlabel = document.getElementById("checkboxLabel_q" + x + "_input_" + p);
					questionlabel.id = "checkboxLabel_q" + (x -1)+ "_input_" + p;
				}

				for(var y = 1 ; y <= count_input ; y++)
				{
					
					var question_input = document.getElementById("checkboxchoice_q_" + x + "_input_" + y);
					question_input.setAttribute('onchange','updateOption("checkboxchoice_q_'+(x-1)+'_input_'+y+'")');
					question_input.id = "checkboxchoice_q_" + (x-1) + "_input_" + y;
					question_input.name = "checkboxchoice_q_" + (x-1) + "_input_" + y;
				}

				mdiv.id = "addMoreCheckboxField" +(x-1);

				var editinput = document.getElementById("edit_input_Q_" + x);
				editinput.setAttribute('onclick','editQuestionDone("Q_'+(x-1)+'")');
				editinput.id = "edit_input_Q_" + (x-1);

				var addCheckL = document.getElementById("addCheck"+x);
				addCheckL.setAttribute('onclick','addCheckBoxtoField("addMoreCheckboxField'+(x-1)+'")');
				addCheckL.id = "addCheck"+ (x-1);

				var deleteCheckL = document.getElementById("deleteCheck"+x);
				deleteCheckL.setAttribute('onclick','deleteCheckBoxtoField("addMoreCheckboxField'+(x-1)+'")');
				deleteCheckL.id = "deleteCheck"+ (x-1);
			}

			if(QuestionType[x] == "select")
			{
				var count_input = 0;
				var count_option = 0;
				var count_label = 0;

				var input =  document.getElementById("input_Q_" + x);
				var mdiv = document.getElementById("addMoreOptionField" +x);
			
				input.id = "input_Q_" + (x-1);
				input.name = "select_q_" + (x-1);
				
				$('#select_Q_' + x).find('option').each(function () {
   				 	count_option++;
				});
				$('#addMoreOptionField' + x).find('input').each(function () {
   				 	count_input++;
				});
					$('#addMoreOptionField' + x).find('label').each(function () {
   				 	count_label++;
				});


				var selectoption = document.getElementById("select_Q_" + x);
				for(var j =1 ; j <= count_option ; j++)
				{
					var selectoption = document.getElementById("select_q_" +x+"_option_" + j);
					selectoption.id = "select_q_" + (x-1) +"_option_" + j
				}
				selectoption.id = "select_Q_" + (x-1);



				for(var y = 1 ; y <= count_input ; y++)
				{
					var question_input = document.getElementById("select_q_" + x + "_input_" + y);
					question_input.setAttribute('onchange','updateSelectOption("select_q_'+(x-1)+'_input_'+y+'")');
					question_input.id = "select_q_" + (x-1) + "_input_" + y;
					question_input.name = "select_q_" + (x-1) + "_input_" + y;
				}
				for(var k = 1 ; k <count_label ; k++)
				{
					var questionlabel = document.getElementById("optionLabel_q_"+ x +"_input_"+k);
					questionlabel.id = "optionLabel_q_"+ (x-1) +"_input_"+k
				}
				mdiv.id = "addMoreOptionField" +(x-1);

				var editinput = document.getElementById("edit_input_Q_" + x);
				editinput.setAttribute('onclick','editQuestionDone("Q_'+(x-1)+'")');
				editinput.id = "edit_input_Q_" + (x-1);
	
			}
		}
		else
		{

		}
	}
}
	SurveyArry.splice(QuestionIndex, 1);
	for(var x = 0 ; x < SurveyArry.length ; x++)
	{
		var text = SurveyArry[x].split("_")
		SurveyArry[x] = text[0] + "_Q" + x;
	}
	console.log(SurveyArry);
/*	QuestionType.splice(QuestionIndex, 1);
	QuestionArray.splice(QuestionIndex, 1);*/

	$("#"+questionID).slideUp("fast", function(){
		parentDIV.removeChild(childDIV);	
	});
	//counti--;
}