const express = require('express');
const User = require('../models/user.model');

// import generateToken function
const generateToken = require('../utils/generateToken');

// for registration
const registerController = async (req, res) => {
    const { name, username, password } = req.body;

    const userExists = await User.findOne({ username });
    
    if(userExists){
        res.status(400);
        throw new Error("User already exists!");
    }

    const user = await User.create({
        name,
        username,
        password
    });
    
    if(user) {
        res.status(201).json({
            _id : user._id,
            name : user.name,
            username : user.username,
            shopParticipate : user.shopParticipate,
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
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });
    
    if(user && user.matchPassword(password)){
        res.json({
            _id : user._id,
            username : user.username,
            token : generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid username or password!");
    }
}

module.exports = { 
    registerController, 
    loginController 
};