const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const userModel = mongoose.model('user');
const session = require('express-session');
const title = 'Sign In';


router.get('/', function(req, res, next) {
  res.render('login', {title: title});
});

router.post('/', function(req, res, next) {
	var sess = req.session;
	var body = req.body;
	var form = {
		password : body.password,
		email : body.email
	};
	var errors = {};
	userModel.findOne({ email: body.email }, function(error, doc) {
        if (doc == null){
        	errors.msg = 'Invalid Email';
        	renderLogin(res, form, errors, title);
        }
        else{
        	var user = new userModel();
        	user.comparePassword(body.password, doc.password, function(err, isMatch) {
	            if(!isMatch){
            		errors.msg = 'Invalid Password';
            	}
            	else
            	{
            		sess.email = doc.email;
            		return res.redirect('/user/list');
            	}
	            
	            renderLogin(res, form, errors, title);
	        });
        }
    });
});
function renderLogin(res, form, errors, title)
{
	res.render('login', {
	  	form: form,
	  	errors: errors,
	  	title: title
  	});
}
module.exports = router;