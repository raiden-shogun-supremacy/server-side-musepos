const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderList : [
        {
            menuID : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'menu',
            },
            menuName : {
                type : String,
                required : true
            },
            orderAmount : {
                type : Number,
                required : true
            }
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
    totalPay : {
        type : Number,
        required : true
    },
    orderStatus : {
        type : String,
        required : true
    }
    
},{
    timestamps : true,
});

module.exports = Order = mongoose.model('order', orderSchema);