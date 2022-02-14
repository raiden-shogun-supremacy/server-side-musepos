const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
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

module.exports = Order = mongoose.model('order', orderSchema);