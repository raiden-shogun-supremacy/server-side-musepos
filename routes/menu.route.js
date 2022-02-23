const express = require('express');
const router = express.Router();

// import authorizing middleware
const protect = require('../middlewares/authorization.middleware');

// imports routes

const {
    showByCategory, 
    addMenu, 
    deleteMenu, 
    editStockAmount, 
    getAllMenu
} = require('../controllers/menu.controller');

// get all menu by shopID
router.route('/:shopId').get(protect, getAllMenu);

// add a new menu
router.route('/add-menu').post(protect, addMenu);

// delete current menu by menuID
router.route('/delete-menu/:id').delete(protect, deleteMenu);

// edit quantity or stock amount by menuID
router.route('/edit-qty/:id').put(protect, editStockAmount);

// query by filter keyword
router.route('/menu-type/:id').get(protect, showByCategory);

module.exports = router;