const express = require('express');
const router = express.Router();

// Import controllers
const { registerController,
        loginController } = require('../controllers/user.controller');

// Routes
router.route('/register').post(registerController);
router.route('/login').post(loginController);


module.exports = router;