const express = require('express');
const Shop = require('../models/shop.model');
const User = require('../models/user.model');
// get all shop
const getAllShop = async (req, res) => {
    // find all shop in shop collections
    // where the owner is from id from token
    const allShops = await Shop.find({
        $or:[
            { owner : req.user._id },
            { manager : [req.user._id]},
            { employee : [req.user._id]}
        ]
    });
    res.status(201).json(allShops);
};

// get current shop
const getCurrentShop = async (req, res) => {
    const currentShop = await Shop.findById(req.params.id).where(
        {
            $or:[
                { owner : req.user._id },
                { manager : [req.user._id]},
                { employee : [req.user._id]}
            ]
        }
    );

    if(currentShop) {
        res.status(201).json(currentShop);
    } else {
        res.status(404).send("Not found");
    }
};

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
    const newShop = await Shop.create({
        shopName : shopName,
        owner : owner,
    });

    const obj = newShop._id;
    User.findOneAndUpdate({ _id: owner }, 
    { $push: { shopParticipate : obj  } },function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log(success);
        }
    });
    

    if(newShop) {
        res.status(201).json({
            newShop
        });
    } else {
        res.status(400);
        throw new Error("Cannot create shop.");
    }
};


// edit shop's information
const editShop = async (req, res) => {
    const { shopName } = req.body;
    const shop = await Shop.findById(req.params.id);

    if(shop.owner.toString() != req.user._id.toString()){
        res.status(401);
        throw new Error("You do not have a permission to edit an info!");
    }


    if(shop){
        shop.shopName = shopName;

        const updatedShop = await shop.save();
        res.status(201).json(updatedShop);
    } else {
        res.status(400);
        throw new Error("Something wrong with editing");
    }
}

// delete a shop by id
const deleteShop = async (req, res) => {
    const shop = await Shop.findById(req.params.id);

    // if there is no shop
    if(!shop) {
        res.status(404);
        throw new Error("Shop not found");
    }

    // checking permission
    if(shop.owner.toString() != req.user._id.toString()){
        res.status(400);
        throw new Error("You don't have a permission to act!");
    }

    // if there is a shop
    if(shop) {
        await shop.remove();
        res.send("Shop removed.");
    } 

};

module.exports = { 
    getAllShop,
    getCurrentShop,
    createShop,
    editShop,
    deleteShop,
};