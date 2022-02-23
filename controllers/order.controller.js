const express = require('express');
const asyncHandler = require('express-async-handler');
const Order = require('../models/order.model');

// get all order of that shop
const getAllOrder = asyncHandler(async (req, res) =>{
    const allOrder = await Order.find({ parentShop : req.params.shopId });
    
    if(!allOrder){
        res.status(404)
        throw new Error("Something went wrong with getting orders.");
    }

    if(allOrder){
        res.status(201).json(allOrder);
    }
});

// create new order
const createOrder = asyncHandler(async (req, res) => {
    const { parentShop, 
            orderList,
            amtPeople,
            typeOfAct,
            totalPay,
            orderStatus } = req.body;

    const createOrder = await Order.create({
        parentShop : parentShop,
        orderList : orderList,
        amtPeople : amtPeople,
        typeOfAct : typeOfAct,
        totalPay : totalPay,
        orderStatus : orderStatus
    });

    if(createOrder){
        res.status(201).json(createOrder);
    } else {
        res.status(400);
        throw new Error("Something went wrong with creating order.");
    }
});

// get current order
const getCurrentOrder = asyncHandler(async (req, res) => {
    const currentOrder = await Order.findById(req.params.id);

    if(!currentOrder){
        res.status(404);
        throw new Error("Order not found.");
    }

    if(currentOrder){
        res.status(201).json(currentOrder);
    }
});

// change status after billing
const checkBill = asyncHandler(async (req, res) => {
    const { orderStatus } = req.body;
    const currentOrder = await Order.findById(req.params.id);

    if(!currentOrder){
        res.status(404);
        throw new Error("Order not found.");
    }

    if(currentOrder) {
        currentOrder.orderStatus = orderStatus;

        const updatedOrder = await currentOrder.save();
        res.status(201).json(updatedOrder);
    } else {
        res.status(404);
        throw new Error("Something went wrong with updating");
    }
});

// delete order by orderID
const deleteOrder = asyncHandler(async (req, res) => {
    const { parentShop } = req.body;
    const order = await Order.findById(req.params.id);
    
    if(!order) {
        res.status(404);
        throw new Error("Order not found.");
    }

    if(order){
        await Shop.findByIdAndUpdate(parentShop, 
            { $pull: { order : req.params.id } }, { new: true, useFindAndModify: false }
        );
        await order.remove();
        res.send("Order removed.");
    }
});

module.exports = {
    createOrder,
    deleteOrder,
    getAllOrder,
    checkBill,
    getCurrentOrder
};