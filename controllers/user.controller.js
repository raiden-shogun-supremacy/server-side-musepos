const express = require('express');
const UserSchema = require('../models/user.model');

// import generateToken function
const generateToken = require('../utils/generateToken');

// for registration
const registerController = async (req, res) => {
    const { fullname, email, password } = req.body;

    const userExists = await UserSchema.findOne({ email });
    
    if(userExists){
        res.status(400);
        throw new Error("User already exists!");
    }

    const user = await UserSchema.create({
        fullname,
        email,
        password
    });
    
    if(user) {
        res.status(201).json({
            _id : user._id,
            fullname : user.fullname,
            email : user.email,
            role : user.role,
            token : generateToken(user._id),
        });
    } else {
        res.status(400).json({
            status : 400,
            message : err.message,
        });
    }
    
}

// for login
const loginController = async (req, res) => {
    const { email, password } = req.body;
    
    const user = await UserSchema.findOne({ email });
    
    if(user && user.matchPassword(password)){
        res.json({
            _id : user._id,
            email : user.email,
            role : user.role,
            token : generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid email or password!");
    }
}

module.exports = { registerController, loginController };