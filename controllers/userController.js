const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");

// Jwt secret from .env
require('dotenv').config();
const secret = process.env.JWT_SECRET;

// sign jwt token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, secret, {
        expiresIn: maxAge
    })
}

const handleErrors = (err) => {
    //console.log(err.message, err.code);
    const errors = {name : "", email : "", password : "" };

        // incorrect email
    if (err.message === 'Invalid Email') {
        errors.email = 'This email is not registered';
    }

    // incorrect password
    if (err.message === 'Incorrect Password') {
        errors.password = 'This password is incorrect';
    }


    // unique email validation error
    if(err.code == 11000){
        errors.email = "Email already exists. Try aother email.";
    }

    // validation errors
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            // console.log(error.properties);
            errors[properties.path] = properties.message;
        })
    }

    return errors;
}

// get register form
module.exports.register_form = (req, res) => {
    return res.sendFile(path.join(__dirname, '../public/register.html'))
}

// register action
module.exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({ name, email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({
            status: 'success',
            user: user._id
        })
    } catch (error) {
        const errors = handleErrors(error);
        res.status(500).json({
            status: "fail",
            errors: errors
        })
    }
}

// get login form
module.exports.login_form = (req, res) => {
    return res.sendFile(path.join(__dirname, '../public/index.html'))
}

// login action
module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const authenticatedUser = await bcrypt.compare(password, user.password);
            if (authenticatedUser) {
                const token = createToken(user._id);
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                res.status(201).json({
                    status: 'success',
                    user: user._id
                })
            } else {
                throw Error("Incorrect Password");
            }
        } else {
            throw Error("Invalid Email");
        }
    } catch (error) {
        const errors = handleErrors(error);
        res.status(500).json({
            status: "fail",
            errors: errors
        })
    }
}

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/login');
}