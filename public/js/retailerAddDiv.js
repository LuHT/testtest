
/*SHOW FUNCTION AFTER CLICKING ITEMS IN THE DROP DOWN BUTTON*/
function addPicture(){
	var adPic = document.getElementById("adPic");
	//$(adPic).fadeIn("slow");
	$(adPic).slideDown("slow");
	
	var dropdownAdPic = document.getElementById("adPicList");
	dropdownAdPic.style.display = "none";
}

function addProductPicture(){
	var proPic = document.getElementById("productPic");
	//$(adPic).fadeIn("slow");
	$(proPic).slideDown("slow");
	
	var dropdownProPic = document.getElementById("productPicList");
	dropdownProPic.style.display = "none";
}

function addOriPrice(){
	var oriprice = document.getElementById("oriprice");
	//$(oriprice).fadeIn("slow");
	$(oriprice).slideDown("slow");
	
	var dropdownOriPrice = document.getElementById("oriPirceList");
	dropdownOriPrice.style.display = "none";
	hideDiscountRange();

}

function addDiscountRate(){
	var discountrate = document.getElementById("discountrate");
	hideDiscountRange();
	//$(discountrate).fadeIn("slow");
	$(discountrate).slideDown("slow");
	
	var dropdownDiscountRate = document.getElementById("discountRateList");
	dropdownDiscountRate.style.display = "none";
	addOriPrice();
}

function addDiscountRange(){
	var discountrange = document.getElementById("discountrange");
	//$(discountrange).fadeIn("slow");
	$(discountrange).slideDown("slow");
	
	var dropdownDiscountRange = document.getElementById("discountRangeList");
	dropdownDiscountRange.style.display = "none";
	
	hideDiscountRate();
	hideOriPrice();
}

function addSpecification(){
	var specificationDiv = document.getElementById("specification");
	$(specificationDiv).slideDown("slow");
	
	var dropdownSpecification = document.getElementById("adSpecification");
	dropdownSpecification.style.display = "none";
}



/*HIDING DROP DOWN LIST IN ADD BUTTON*/
function hidePicture(){
	var adPic = document.getElementById("adPic");
	//$(adPic).fadeOut("slow");
	$(adPic).slideUp("slow");
	
	var dropdownAdPic = document.getElementById("adPicList");
	dropdownAdPic.style.display = "block";
	
	/*Remove data in boxes*/
	var picInput = document.getElementById("advpic");
	picInput.value = "";
	var picDisplay = document.getElementById("imgPreview");
	picDisplay.src = "#";
	
	var imageDisplay = document.getElementById("imageDiv");
	imageDisplay.style.display = "none";
	
}

function hideProPicture(){
	var proPic = document.getElementById("productPic");
	//$(adPic).fadeOut("slow");
	$(proPic).slideUp("slow");
	
	var dropdownAdPic = document.getElementById("productPicList");
	dropdownAdPic.style.display = "block";
	
	/*Remove data in boxes*/
	var picInput = document.getElementById("propic");
	picInput.value = "";
	var picDisplay = document.getElementById("imgPreviews");
	picDisplay.src = "#";
	
	var imageDisplay = document.getElementById("imageDivs");
	imageDisplay.style.display = "none";
	
}

function hideOriPrice(){
	var oriprice = document.getElementById("oriprice");
	//$(oriprice).fadeOut("slow");
	$(oriprice).slideUp("slow");
	
	var dropdownOriPrice = document.getElementById("oriPirceList");
	dropdownOriPrice.style.display = "block";
	
	var oriPriceInput = document.getElementById("oriPrice");
	oriPriceInput.value = "";
	
}

function hideDiscountRate(){
	var discountrate = document.getElementById("discountrate");
	//$(discountrate).fadeOut("slow");
	$(discountrate).slideUp("slow");
	
	var dropdownDiscountRate = document.getElementById("discountRateList");
	dropdownDiscountRate.style.display = "block";
	
		/*var dropdownDiscountRange = document.getElementById("discountRangeList");
		dropdownDiscountRange.style.display = "block";*/
	
	var discountRateInput = document.getElementById("textInput");
	discountRateInput.value = "";
	
}

function hideDiscountRange(){
	var discountrange = document.getElementById("discountrange");
	//$(discountrange).fadeOut("slow");
	$(discountrange).slideUp("slow");
	
	var dropdownDiscountRange = document.getElementById("discountRangeList");
	dropdownDiscountRange.style.display = "block";
	
		/*var dropdownDiscountRate = document.getElementById("discountRateList");
		dropdownDiscountRate.style.display = "block";*/
	
	var discountFrom = document.getElementById("discountRateFrom");
	discountFrom.value="";
	var discountTo = document.getElementById("discountRateTo");
	discountTo.value="";
	
}

function hideSpecification(){
	var postSpecification = document.getElementById("specification");
	$(postSpecification).slideUp("slow");
	
	var dropdownSpecification = document.getElementById("adSpecification");
	dropdownSpecification.style.display = "block";
	
	var specificationValue = document.getElementById("specificationTextArea");
	specificationValue.value="";
}
function ShowAddshopCategoryBox()
{

	
	var AddshopCategoryL = document.getElementById("AddshopCategoryL");
	var AddshopCategory = document.getElementById("AddshopCategory"); 
	var AddshopCategoryBox = document.getElementById("AddshopCategoryBox");
	var DefaultshopCategoryBox = document.getElementById("DefaultshopCategoryBox");
 	if(AddshopCategoryL.innerHTML == "Add New Category")
 	{
 		
		AddshopCategoryBox.style.display = "block";
		DefaultshopCategoryBox.style.display = "none";
		AddshopCategoryL.innerHTML = "Use past Shop Category";
		 document.getElementById("selectedOp").selected = "true";
		//document.getElementById('AddshopCategoryL').innerHTML = "<a style='cursor:pointer' onclick='ShowAddshopCategoryBox()'>Use past Shop Category</a>";

 	}
 	else
 	{
 		AddshopCategory.value = "";
		AddshopCategoryBox.style.display = "none";
		DefaultshopCategoryBox.style.display = "block";
		AddshopCategoryL.innerHTML = "Add New Category";
		//document.getElementById('AddshopCategoryL').innerHTML = "<a style='cursor:pointer' onclick='ShowAddshopCategoryBox()'>Add New Category</a>";
 	}
	//document.getElementById('AddshopCategoryL').innerHTML = "<a href='ShowAddshopCategoryBox()'>CLOSE</a>";
	

}

function ShowlocationBox()
{
	var PreviousLocationBox = document.getElementById("PreviousLocationBox");
	var locationBox = document.getElementById("locationBox");
	var AddLocation = document.getElementById("AddLocation");
	var AutoSearchL = document.getElementById("AutoSearch");
 	

	PreviousLocationBox.style.display = "none";
	locationBox.style.display = "block";


 	if(AddLocation.innerHTML == "Add New Location")
 	{
 		
		locationBox.style.display = "block";
		PreviousLocationBox.style.display = "none";
		AddLocation.innerHTML = "Use Previous Location";
		 document.getElementById("selectedOp2").selected = "true";
		//document.getElementById('AddshopCategoryL').innerHTML = "<a style='cursor:pointer' onclick='ShowAddshopCategoryBox()'>Use past Shop Category</a>";

 	}
 	else
 	{
 		AutoSearchL.value = "";
		locationBox.style.display = "none";
		PreviousLocationBox.style.display = "block";
		AddLocation.innerHTML = "Add New Location";
		//document.getElementById('AddshopCategoryL').innerHTML = "<a style='cursor:pointer' onclick='ShowAddshopCategoryBox()'>Add New Category</a>";
 	}
}

function ShowlocationBoxes()
{
	var PreviousLocationBox = document.getElementById("PreviousLocationBox");
	var locationBox = document.getElementById("locationBox");
	var AddLocation = document.getElementById("AddLocation");
	var AutoSearchL = document.getElementById("AutoSearch");
 	

	PreviousLocationBox.style.display = "none";
	AutoSearchL.style.display = "block";


 	if(AddLocation.innerHTML == "Add New Location")
 	{
 		
		AutoSearchL.style.display = "block";
		PreviousLocationBox.style.display = "none";
		AddLocation.innerHTML = "Use Previous Location";
		 document.getElementById("selectedOp2").selected = "true";
		//document.getElementById('AddshopCategoryL').innerHTML = "<a style='cursor:pointer' onclick='ShowAddshopCategoryBox()'>Use past Shop Category</a>";

 	}
 	else
 	{
 		AutoSearchL.value = "";
		AutoSearchL.style.display = "none";
		PreviousLocationBox.style.display = "block";
		AddLocation.innerHTML = "Add New Location";
		//document.getElementById('AddshopCategoryL').innerHTML = "<a style='cursor:pointer' onclick='ShowAddshopCategoryBox()'>Add New Category</a>";
 	}
}


/*HIDE ADDING BUTTON*/
/*function showHideButton(){
	var addButton = document.getElementById("addFunctionButton");
	if(checking < 4){
		addButton.style = "block";
	}
	
	if(checking == 4){
		addButton.style.display = "none";
	}
}*/