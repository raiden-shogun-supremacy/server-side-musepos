const express = require('express');
const router = express.Router();

// Import controllers
const { registerController,
        loginController } = require('../controllers/user.controller');

// registration
router.route('/register').post(registerController);

// authentication
router.route('/login').post(loginController);



module.exports = router;