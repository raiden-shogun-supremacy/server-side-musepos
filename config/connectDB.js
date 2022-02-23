const mongoose = require('mongoose');
const connectDB = () => mongoose.connect("mongodb+srv://kaoapithepp:abcd1234@tester.l4nve.mongodb.net/tester?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, () => {
    console.log("MongoDB connected!");
    
});

module.exports = connectDB;