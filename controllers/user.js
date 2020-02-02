const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const userModel = mongoose.model('user');

router.get('/add', function(req, res, next) {
  const title = 'Add user';
  res.render('user', {title: title});
});

router.get('/list', function(req, res, next) {
	const title = 'User list';
  	
	userModel.find({'is_deleted' : false}, 'first_name last_name email', function (err, users) {
	  	if(!err){
			res.render('user_list', {
			  	users: users,
			  	title: title
		  });
		}
		else{
			console.log(err);
		}
	});
});

router.post('/add', function(req, res, next) {
	const title = 'Add user';
	var body = req.body;
	
	var form = {
		first_name : body.first_name,
		last_name : body.last_name,
		password : body.password,
		email : body.email
	};

	req.check('first_name', 'Invalid First Name').not().isEmpty();
	req.check('last_name', 'Invalid Last Name').not().isEmpty();
	req.check('password', 'Password length should be more than 5').isLength(5);
	req.check('email', 'Invalid Email').isEmail();
	
	var errors = req.validationErrors(true);

	if(errors)
	{
		res.render('user', {
		  	form: form,
		  	errors: errors,
		  	title: title
	  });
	}
	else
	{
		var user = new userModel();
		user.first_name = body.first_name;
		user.last_name = body.last_name;
		user.email = body.email;
		user.password = user.generateHash(body.password);
		user.added_on = new Date();

		user.save((err, docs)=>{
			if (!err) 
			{
				return res.redirect('/user/list');
			}
			else
			{
				res.send('Error');
			}
		});
	}
});

module.exports = router;