const express = require('express');
const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');
const Shop = require('../models/shop.model')
// import generateToken function
const generateToken = require('../utils/generateToken');
const { ConnectionPoolClosedEvent } = require('mongodb');
const e = require('express');

// for registration
const registerController = asyncHandler(async (req, res) => {
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

    console.log(user) ;

});


// for login
const loginController = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });
    
    if(user && await user.matchPassword(password)){
        res.json({
            _id : user._id,
            username : user.username,
            token : generateToken(user._id),
        });
        
    } else {
        res.status(400);
        throw new Error("Invalid username or password!");
    }
});

const addEmployee = asyncHandler(async (req , res) => {
    const { employee , role , shop } = req.body ; 

    // find an user 
    const emName = await User.findOne({username : employee});

    //find shop 
    const checkShop = await Shop.findOne({_id: shop});
    
    const refM = await Shop.findOne({_id: checkShop._id , manager : emName._id} )
    const refE = await Shop.findOne({_id: checkShop._id , employee : emName._id})
     userManager = await refM.manager.find(element => element == emName._id )
    // userEmployee =  await refE.employee.find(element => element )
    // userManager = "" + userManager ; Shop.findOne({_id : checkShop._id } , {'employee._id' : userEmployee})
    // userEmployee = ""  + userEmployee ;

    console.log(userManager)

    //check if emName are true and emName not owner
    if (emName && emName._id != checkShop.owner){
       
        if(emName._id == userManager ){
            res.status(400).send("assign already")
        }else {
                if(role == "manager" ){
                    Shop.findOneAndUpdate({ _id : checkShop._id  } , { $push : {manager : emName }} 
                    ,function (error, success) {
                    if (error) {     
                        console.log(error);
                        res.status(400);
                        throw new Error("Fail to assing role manager.");  
                    } else {
                        console.log(success);
                    }
                });
                }else if (role == "employee" && Shop.findOne({employee : emName})){
                    Shop.findOneAndUpdate({ _id: checkShop._id  } , { $push : {employee : emName }} 
                        ,function (error, success) {
                        if (error) {
                            console.log(error);
                            res.status(400);
                            throw new Error("Fail to assing role employee.");
                        } else {
                            console.log(success);
                        }
                    });
                }else {
                    res.status(400);
                    throw new Error("Cannot assign employee.");
                }
            }
    }

})


const changeRole  = asyncHandler(async (req , res) => {
    const { id  , role , shop} = req.body;
    
    const user = await Shop.find({_id : shop , employee : id});
    
    if(user && role == "manager"){
        Shop.findOneAndUpdate({ _id: shop  } , { $push : {manager : user._id }} 
            ,function (error, success) {
            if (error) {
                console.log(error);
                res.status(400);
                throw new Error("Fail to change role to Manager.");
            } else {
                console.log(success);
            }
        });
    }else if (user && role == "employee") {
        Shop.findOneAndUpdate({ _id: shop  } , { $push : {employee : user._id }} 
            ,function (error, success) {
            if (error) {
                console.log(error);
                res.status(400);
                throw new Error("Fail to change role employee.");
            } else {
                console.log(success);
            }
        });
    }else {
        res.status(400);
        throw new Error("Fail to promote.");
    }

});



module.exports = { 
    registerController, 
    loginController ,
    addEmployee ,
    changeRole 
};