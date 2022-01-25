const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StockSchema = new Schema({
    menu : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'menu',
        }
    ],
    parentShop : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'shop'
    }
});

module.exports = Stock = mongoose.model('stock', StockSchema);