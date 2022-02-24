const express = require('express');
const router = express.Router();

const protect = require('../middlewares/authorization.middleware');

const { createOrder,
        deleteOrder,
        getAllOrder,
        checkBill,
        getCurrentOrder } = require('../controllers/order.controller');

// get all order of that shop
router.route('/:shopId').get(protect, getAllOrder);

// create a new order
router.route('/create-order').post(protect, createOrder);

// delete-order by orderID
router.route('/delete-order/:id').delete(protect, deleteOrder);

// edit order status
router.route('/check-bill/:id').put(protect, checkBill);

// get current order by orderID
router.route('/current-order/:id').get(protect, getCurrentOrder);

module.exports = router;