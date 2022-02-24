const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/connectDB');

// Invoke dependencies
dotenv.config();
const app = express();
connectDB();

/* 
    Import routes 
*/
const userRoutes = require('./routes/user.route');
const shopRoutes = require('./routes/shop.route');
const menuRoutes = require('./routes/menu.route');
const orderRoutes = require('./routes/order.route');

// Configuration
app.use(express.json({limit: "30mb",extended:true}));
app.use(express.urlencoded({limit: "30mb",extended:true}));
app.use(cors());

// Generate view at main directory
app.get('/', (req, res) => {
    res.send("API is working successfully!");
});

// Using routes
app.use('/api/user/', userRoutes);
app.use('/api/shop/', shopRoutes);
app.use('/api/menu/', menuRoutes);
app.use('/api/order/', orderRoutes);

// Assign server's port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

// Error handlers
const { errorNotfound, errorHandler } = require('./middlewares/errorHandler.middleware');
app.use(errorNotfound);
app.use(errorHandler);