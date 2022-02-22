const express = require('express');
const router = express.Router();

// import authorizing middleware
const protect = require('../middlewares/authorization.middleware');

// imports routes

const {  showByCategory , showAllMenu , addMenu , deleteMenu , showByone
} = require('../controllers/menu.controller');

router.route('/showallmenu').get(showAllMenu , protect);

router.route('/addmenu').post(addMenu , protect);

router.route('/delete-menu/:id').delete(deleteMenu , protect)

router.route('/show-byone/:id').get(showByone , protect) ;


module.exports = router;