const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StockSchema = new Schema({
    menuID : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'menu',
    },
    stockAmount : {
        type: Number,
        required: true,
    },
    stockStatus: {
        type: String,
        required: true,
    },
    parentShop : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'shop'
    }
});

module.exports = Stock = mongoose.model('stock', StockSchema);