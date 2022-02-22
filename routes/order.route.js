const express = require('express');
const router = express.Router();

const protect = require('../middlewares/authorization.middleware');

const { newOrder } = require('../controllers/order.controller');
const { deleteOrder } = require('../controllers/order.controller');
const { showAllOrder } = require('../controllers/order.controller');
const { getCurrentOrder } = require('../controllers/order.controller');

router.route('/neworder').post(newOrder, protect);
router.route('/delete-order/:id').delete(deleteOrder, protect);
router.route('/show-all-order').get(showAllOrder, protect);
router.route('/order-now/:id').get(getCurrentOrder, protect);

module.exports = router;