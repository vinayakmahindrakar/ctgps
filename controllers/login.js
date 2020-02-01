const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const userModel = mongoose.model('user');
const title = 'Sign In';

router.get('/', function(req, res, next) {
  res.render('login', {title: title});
});

router.post('/', function(req, res, next) {
	var body = req.body;

	userModel.findOne({ email: body.email }, function(err, doc) {
        if (err){
        	console.log(err);
        }
        else{
        	var user = new userModel();
        	user.comparePassword(body.password, doc.password, function(err, res) {
	            if (err){
	            	console.log('error 12'+err);
	            } 
	            else{
	            	console.log('Password123: '+res); 
	            }
	        });	
        }
    });
});

module.exports = router;