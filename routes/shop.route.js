const express = require('express');
const router = express.Router();

// import authorizing middleware
const protect = require('../middlewares/authorization.middleware');

// imports routes
const {
    getAllShop,
    createShop,
} = require('../controllers/shop.controller');

// get all of shop
router.route('/').get(protect, getAllShop);

// get shop by id
router.route('/:id').get(protect);

// create shop
router.route('/create').post(protect, createShop);

module.exports = router;