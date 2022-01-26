const express = require('express');
const router = express.Router();

// import authorizing middleware
const protect = require('../middlewares/authorization.middleware');

// imports routes
const {
    getAllShop,
    getCurrentShop,
    createShop,
    editShop,
    deleteShop,
} = require('../controllers/shop.controller');

// get all of shop of that user
router.route('/').get(protect, getAllShop);

// get shop by id
router.route('/:id').get(protect, getCurrentShop);

// create shop
router.route('/create-shop').post(protect, createShop);

// edit shop
router.route('/edit-shop/:id').put(protect, editShop);

// delete shop
router.route('/delete-shop/:id').delete(protect, deleteShop);


module.exports = router;