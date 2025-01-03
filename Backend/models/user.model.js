const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
	fullname: {
		firstname: {
			type: String,
			required: true,
			minlength: [3, 'First Name must be at least 3 characters long'],
		},
		lastname: {
			type: String,
			minlength: [3, 'First Name must be at least 3 characters long'],
		},
	},
    email:{
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 characters long'],
    },
    password: {
        type: String,
        required: true,
        select: false, //for not sending passwords
    },
socketId:{
    type: String}

});

//Generating the token
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET);
    return token;
}

//compare the argument password against the password
userSchema.methods.comparePasswords = async function (password){
    return await bcrypt.compare(password,this.password);
}

//hash the password before saving it in the database
userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;