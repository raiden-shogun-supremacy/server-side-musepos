const express = require('express');
const router = express.Router();

// Import controllers
const { registerController,
        loginController ,   
        addEmployee ,
        changeRole
                    } = require('../controllers/user.controller');

// registration
router.route('/register').post(registerController);

// authentication
router.route('/login').post(loginController);

router.route('/add-employee').post(addEmployee) ; 

router.route('/change-role').post(changeRole);

module.exports = router;