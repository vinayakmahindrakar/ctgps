const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
	first_name : {
		type : String,
		required : "Required"
	},
	last_name : {
		type : String,
		required : "Required"
	},
	email : {
		type : String,
		required : "Required"
	},
	password : {
		type : String,
		required : "Required"
	},
	is_deleted : {
		type : Boolean,
		default : false
	},
	added_on : {
		type: String
	}
}, {collection: 'user'});

userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
};

userSchema.methods.comparePassword = function(userPassword, password, cb){
	bcrypt.compare(userPassword, password, function(err, res) {
        if (err) return cb(err);
        cb(null, res);
    });
};

module.exports = mongoose.model('user', userSchema);