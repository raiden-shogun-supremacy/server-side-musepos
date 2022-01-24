const express = require('express');
const router = express.Router;

// import authorizing middleware
const protect = require('../middlewares/authorization.middleware');

// import schema
const ShopSchema = require('../models/shop.model');

// imports routes
const { shopGetAll } = require('../controllers/shop.controller');

// get all of shop
router.route('/').get(protect);

// get shop by id
router.route('/:id').get(protect);

router.route('/create').post(protect);