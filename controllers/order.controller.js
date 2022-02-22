const express = require('express');
const Order = require('../models/order.model');



const newOrder = async (req, res) => {

    const { shop , menu , amtPeople , typeOfAct } = req.body;

    const newOrder = await Order.create({
        parentShop : shop,
        menu : menu,
        amtPeople : amtPeople,
        typeOfAct :typeOfAct
        
    });

    res.status(201).json({newOrder})
}

const getCurrentOrder = async (req, res) => {
    const currentOrder = await Order.findById(req.params.id);

    if(currentOrder) {
        res.send(currentOrder);
    } else {
        res.status(404).send("Not found");
    }
};


const deleteOrder = async (req, res) => {
    const order = await Order.findById(req.params.id);
    
    if(!order) {
        res.status(404).send("Order not found");
    }
    if(order){
        await order.remove();
        res.send("Order removed.");
    }
}

const showAllOrder = async (res) =>{
    const Allorder = await Order.find({$all: Order});
    res.send(Allorder)
}

module.exports = {
    newOrder,
    deleteOrder,
    showAllOrder,
    getCurrentOrder
};