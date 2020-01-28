var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ctgps', {useNewUrlParser: true}, (error)=>{
	if(!error)
	{
		console.log('Db connected successfully');
	}
	else
	{
		console.log('Error in Db connection');	
	}
});

const user = require('./user.model');