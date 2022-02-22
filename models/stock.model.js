const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StockSchema = new Schema({
    menu : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'menu',
        }
    ],

    stockAmount : {
        type : Number , 
        required : true 
    } , 

    stockStatus : {
        type : String ,
        require : true ,
    } ,
    parentShop : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'shop'
    }
});

module.exports = Stock = mongoose.model('stock', StockSchema);