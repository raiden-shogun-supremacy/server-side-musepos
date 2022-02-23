const express = require('express');
const Menu = require('../models/menu.model');
const Shop = require('../models/shop.model');

// add new menu
const addMenu = asyncHandler(async (req , res ) => {
    const { parentShop,
            menuName,
            category,
            priceUnit,
            img,
            stockAmount,
            stockStatus } = req.body;

    const newMenu = await Menu.create({
        parentshop : parentShop ,
        menu : menuName,
        category : category,
        imgUrl : img,
        priceUnit,
        stockAmount : stockAmount,
        stockStatus : stockStatus
    });

    // if create new menu successfully
    if(newMenu){
        const obj = newMenu._id;
        Shop.findOneAndUpdate({ _id: parentShop }, 
        { $push: { menu : obj } },function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
        });
    }

    res.status(201).json({newMenu});

});

// delete menu
const deleteMenu  = asyncHandler(async (req , res) => {
    const { parentShop } = req.body;
    const menuID = await Menu.findById(req.params.id);

    // if there is no menu which are looking for
    if(!menuID){
        res.status(404);
        throw new Error("No menu which you are looking for");
    }

    if(menuID){
        await menuID.remove();
        await Shop.findOneAndUpdate({ _id: parentShop }, 
            { $pull: { menu : menuID } }, function (err) {
                if(err){
                    console.log(err)
                }
            }
        );
        res.send("Menu is deleted.");
    }
});

// edit stockAmount by menuID
const editStockAmount = asyncHandler(async (req , res) => {
    const menu = Menu.findById(req.params.id);
    const { stockAmount } = req.body;

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

// query menu by category keyword
const showByCategory = asyncHandler(async (req , res) => {
    const { keyword } = req.params.keyword;
    const filteredMenu = Menu.find({ category : keyword });
   
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
    const stock = await Menu.find({ parentShop : parentShop });

    if(!stock){
        res.status(404);
        throw new Error("Maybe error occurs");
    }

    if(stock){
        res.status(201).json(stock);
    }

});

module.exports = {
    showByCategory, 
    addMenu, 
    deleteMenu, 
    editStockAmount, 
    getAllMenu 
};