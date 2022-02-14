const express = require('express');
const router = express.Router();

// import authorizing middleware
const protect = require('../middlewares/authorization.middleware');

// imports routes

const {
    showByCategory,
    addStock ,
} = require('../controllers/stock.controller');

// get stock by category
router.route('/category').get(protect, showByCategory);

// edit quantity 
//router.route('/editqty').get(protect, editQuantity);

router.route('/add-stock').post(addStock , protect)
module.exports = router;