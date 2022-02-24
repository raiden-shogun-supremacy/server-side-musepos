const express = require('express');
const asyncHandler = require('express-async-handler');
const Menu = require('../models/menu.model');
const Shop = require('../models/shop.model');

// add new menu
const addMenu = asyncHandler(async (req , res ) => {
    const { parentShop,
            menuName,
            menuCategory,
            priceUnit,
            imgUrl,
            stockAmount,
            stockStatus } = req.body;

    // check whether shop exists
    const isThereAShop = await Shop.findById(parentShop);
    if(!isThereAShop){
        res.status(404);
        throw new Error("Shop to add the menu does not exist.");
    }

    const newMenu = await Menu.create({
        parentShop : parentShop,
        menuName : menuName,
        menuCategory : menuCategory,
        imgUrl : imgUrl,
        priceUnit : priceUnit,
        stockAmount : stockAmount,
        stockStatus : stockStatus
    });

    // if create new menu successfully
    if(newMenu){
        const obj = newMenu._id;
        Shop.findByIdAndUpdate(parentShop , 
        { $push: { menu : obj } },function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
        });
    }

    res.status(201).json(newMenu);

});

// delete menu
const deleteMenu  = asyncHandler(async (req , res) => {
    const { parentShop } = req.body;
    const menuID = await Menu.findById(req.params.id);

    // if there is no menu which are looking for
    if(!menuID){
        res.status(404);
        throw new Error("No menu which you are looking for.");
    }

    if(menuID){
        await Shop.findByIdAndUpdate(parentShop, 
            { $pull: { menu : req.params.id } }, { new: true, useFindAndModify: false }
        );
        await menuID.remove();
        res.send("Menu is deleted.");
    }
});

// edit stockAmount by menuID
const editStockAmount = asyncHandler(async (req , res) => {
    const { stockAmount } = req.body;
    const menu = await Menu.findById(req.params.id);


    // if there is no menu
    if(!menu){
        res.status(404);
        throw new Error("No menu which you are looking for");
    }

    // if there is a menu we're looking for
    if(menu){
        menu.stockAmount = stockAmount;

        const updatedMenu = await menu.save();
        res.status(201).json(updatedMenu);
    } else {
        res.status(404);
        throw new Error("Something went wrong with updating.");
    }
});

// get menu by menuID
const getMenuById = asyncHandler(async (req , res) => {
    const menu = await Menu.findById(req.params.menuId);


    // if there is no menu
    if(!menu){
        res.status(404);
        throw new Error("No menu which you are looking for");
    }

    // if there is a menu we're looking for
    if(menu){
        res.status(201).json(menu);
    } else {
        res.status(404);
        throw new Error("Something went wrong with updating.");
    }
});

// query menu by category keyword
const showByCategory = asyncHandler(async (req , res) => {
    const keyword = req.body.menuCategory;
    const shopID = req.params.id;
    const filteredMenu = await Menu.find({ parentShop: shopID, menuCategory : keyword });

    // authorizing that shop's employee
    if(!await Shop.findById(shopID).where(
        {
            $or:[
                { owner : req.user._id },
                { manager : [req.user._id]},
                { employee : [req.user._id]}
            ]
        }))
    {
        res.status(401);
        throw new Error("You do not have a permission to see the data.");
    }
   
    if(!filteredMenu){
        res.status(404);
        throw new Error("No menu which you are looking for");
    }

    if(filteredMenu){
        res.status(201).json(filteredMenu);
    }
});

// get all of menus of that shop by shopID
const getAllMenu = asyncHandler(async (req , res) => {
    const parentShop = req.params.shopId;
    const allMenu = await Menu.find({ parentShop : parentShop });

    // authorizing that shop's employee
    if(!await Shop.findById(parentShop).where(
        {
            $or:[
                { owner : req.user._id },
                { manager : [req.user._id]},
                { employee : [req.user._id]}
            ]
        }))
    {
        res.status(400);
        throw new Error("Authorization failed.")
    }

    // there is some error occurs
    if(!allMenu){
        res.status(404);
        throw new Error("Maybe error occurs");
    }

    if(allMenu){
        res.status(201).json(allMenu);
    }

});

module.exports = {
    showByCategory, 
    addMenu, 
    deleteMenu, 
    editStockAmount, 
    getAllMenu,
    getMenuById
};