const express = require('express');
const stockSchema = require('../models/stock.model');
//const UserSchema = require('../models/user.model');


const addStock = async (req , res ) => {
    const { shop , menu } = req.body

    const stock = await stockSchema.create({
        parentshop : shop ,
        menu : menu
    })
    res.status(201).json({stock})

}

const deleteStock  = (req , res) => {
    var stock = req.params.id 
    console.log(product)
    stockSchema.find(({id : {$stock : stock}}) , function (err , arr) {
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
    ProductStockSchema.updateOne(myquery, newvalues, function(err, doc) {
        if (err) throw err;
        console.log("1 document updated" , doc );
      });
}

const showByCategory =  async (req , res) => {
    
    const type = req.body.category
    const category = await ProductStockSchema.find(
     {category : type} 
    )
    res.send(category)
    console.log(category)
   
}

const showAllStock = async (req , res) => {

}



module.exports = {showByCategory , addStock, deleteStock, editQuantity , showAllStock };