const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderList : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'menu',
        }
    ],
    parentShop : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'shop'
    },
    amtPeople : {
        type : Number ,
        required : true 
    },
    typeOfAct : {
        type : String ,
        required : true 
    },
    
},{
    timestamps : true,
});

module.exports = Order = mongoose.model('order', orderSchema);