const express = require('express');
const dotenv = require('dotenv');
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

// Configuration
app.use(express.json());

// Generate view at main directory
app.get('/', (req, res) => {
    res.send("API is working successfully!");
});

// Using routes
app.use('/api/user/', userRoutes);
app.use('/api/shop/', shopRoutes);

// Assign server's port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

// Error handlers
const { errorNotfound, errorHandler } = require('./middlewares/errorHandler.middleware');
app.use(errorNotfound);
app.use(errorHandler);