const express = require('express');
const menuSchema = require('../models/menu.model');
//const UserSchema = require('../models/user.model');

const showAllMenu = async (req , res) => {
    const owner  =  req.body.owner ;
    const allMenu= await menuSchema.find({});
  
    if(allMenu){
        res.status(201).json(allMenu);
    }
    
}

const addMenu = async (req , res ) => {
    const {menuName , priceUnit , imgUrl , parentStock , type} = req.body

    const find = await menuSchema.findOne({ menuName });

    if(find){
        res.status(400);
        throw new Error("menu already exists!");
    }

    const menu = await  menuSchema.create({
        menuName : menuName ,
        priceUnit : priceUnit ,
        imgUrl  : imgUrl ,
        parentStock : parentStock ,
        menuCategory : type 
    })
    console.log(menu) ;


}

const showByone = async(req , res) => {

    const id = req.params.id
    const menu = await  menuSchema.findById(id)
    console.log(menu)
    if(menu){
        res.status(201).json(menu) ;
    }else {
        res.status(400).send("not found menu");
        throw new Error("not found menu");
    }

}


const deleteMenu =  (req , res )=> {

    const  id   = req.params.id
    menuSchema.findByIdAndRemove(id, function (err, docs) {
        if (err){
            res.status(400);
            throw new Error("can not delete");
        }
        else{
            if(docs == null){
                res.status(400).send("not found");
            }
            console.log("Removed Menu : ", docs);
        }
    })

}


const showByCategory =  async (req , res) => {
    
    const type = req.body.params
    const category = await menuSchema.find(
     {menuCategory : type} 
    )
    res.json(category)
    console.log(category)
   
}


module.exports = {showAllMenu , showByone, deleteMenu ,addMenu , showByCategory};