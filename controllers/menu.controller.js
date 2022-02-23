const express = require('express');
const menuSchema = require('../models/menu.model');
//const UserSchema = require('../models/user.model');

const showAllMenu = async (req , res) => {
    const owner  =  req.body.owner ;
    const allMenu= await menuSchema.find({});
    res.send(allMenu);
    res.status(201).json(allMenu);
    
}

const addMenu = async (req , res ) => {
    const { menuName , priceUnit , imgUrl ,stockAmount, parentStock } = req.body

    const menu = await  menuSchema.create({
        menuName : menuName ,
        priceUnit : priceUnit ,
        imgUrl  : imgUrl ,
        stockAmount  : stockAmount , 
        parentStock : parentStock 
   
    })

    console.log(menu) ;

}

const showByone = (req , res) => {
    const id = req.params.id
    const menu = menuSchema.findById(id, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            console.log("Result : ", docs);
        }
    })
    res.status(201).json({menu}) ;

}

const deleteMenu =  (req , res )=> {

    const  id   = req.params.id
    menuSchema.findByIdAndRemove(id, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Removed Menu : ", docs);
        }
    })

}

module.exports = {showAllMenu , showByone, deleteMenu ,addMenu };