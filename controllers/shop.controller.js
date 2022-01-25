const express = require('express');
const Shop = require('../models/shop.model');

// get all shop
const getAllShop = async (req, res) => {
    // find all shop in shop collections
    // where the owner is...
    const allShops = await Shop.find({ owner : req.user._id });
    res.status(201).json(allShops);
}

// create a new shop
const createShop = async (req, res) => {
    const { shopName, owner } = req.body;
    // if user did not provide shop's name
    if (!shopName) {
        res.status(400);
        throw new Error ("Shop name is not provided!");
    }

    // if there is something wrong with authorization
    if (!owner) {
        res.status(400);
        throw new Error("Token failed.");
    }

    // if everything is fine, then create the shop.
    const newNote = await Shop.create({
        shopName : shopName,
        owner : owner,
    });

    if(newNote) {
        res.status(201).json({
            newNote
        });
    } else {
        res.status(400)
        throw new Error("Cannot create shop.");
    }
}

module.exports = { 
    getAllShop,
    createShop,
};