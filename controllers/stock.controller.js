const express = require('express');
const stockSchema = require('../models/stock.model');
//const UserSchema = require('../models/user.model');
const menuSchema = require('../models/menu.model');
const Shop = require('../models/shop.model');

const addStock = async (req , res ) => {
    const { shop , menu , stockamount , stockstatus } = req.body
    
    const stock = await stockSchema.create({
        parentshop : shop ,
        menu : menu ,
        stockAmount : stockamount ,
        stockstatus : stockstatus 
    })
    res.status(201).json({stock})

}

const deleteStock  = (req , res) => {
    var stock = req.params.id 

    stockSchema.findOneAndRemove(({id : {$stock : stock}}) , function (err , arr) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Deleted : ", arr);
            
        }
    })
}

const editQuantity = async (req , res) => {
    var newQuantity = req.body.quantity ; 
    var id = req.params.id ; 
    stockSchema.updateOne(myquery, newvalues, function(err, doc) {
        if (err) throw err;
        console.log("1 document updated" , doc );
      });
}

const showByCategory =  async (req , res) => {
    
    const type = req.body.params
    if(type){
        const category = await stockSchema.find(
            {category : type} 
           )
           res.json(category)
           console.log(category)

    }else{
        res.status(400).send("not found category")
   
    }
   
}

const showAllStock = async (req , res) => {
    const stock = await stockSchema.find({})
    res.json(stock)
}



module.exports = {showByCategory , addStock, deleteStock, editQuantity , showAllStock };