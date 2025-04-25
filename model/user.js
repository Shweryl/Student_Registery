const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please enter user name."],
        minlength : [3, "Name should be at least three characters long."]
    },
    email : {
        type : String,
        unique : true,
        required : [true, "Please enter an email."],
        validate : [isEmail, "Please enter a valid email."]
    },
    password : {
        type : String,
        required : [true, "Please enter a password"],
        minlength : [8, "Password should be at least 8 characters long."]
    }
})

userSchema.pre('save', async function(next) {
    let salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const User = mongoose.model('User', userSchema)

module.exports = User