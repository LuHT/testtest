var express = require('express');
var router = express.Router();


router.get('/', function(request, response) {
	
  response.render('signIn');
  console.log("this is signIn.js here!!");
});
module.exports = router;

