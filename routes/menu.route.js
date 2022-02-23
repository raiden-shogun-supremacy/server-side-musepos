const express = require('express');
const router = express.Router();

// import authorizing middleware
const protect = require('../middlewares/authorization.middleware');

// imports routes

const { showAllMenu , showByone, deleteMenu ,addMenu , showByCategory
} = require('../controllers/menu.controller');

router.route('/showallmenu').get(showAllMenu , protect);

router.route('/addmenu').post(addMenu , protect);

router.route('/delete-menu/:id').delete(deleteMenu , protect)

router.route('/show-byone/:id').get(showByone , protect) ;

router.route('/showbycategory/:category').get(showByCategory, protect) ;

module.exports = router;