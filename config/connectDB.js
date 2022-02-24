const mongoose = require('mongoose');
//mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false
//process.env.MONGO_URI
const connectDB = () => mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, () => {
    console.log("MongoDB connected!");
    
});

module.exports = connectDB;