const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderList : [
        {
            menuID : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'menu',
            }
        },
        {
            menuName : {
                type : String,
                require : true
            }
        },
        {
            orderAmount : {
                type : Number,
                require : true
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
        require : true
    },
    orderStatus : {
        type : String,
        require : true
    }
    
},{
    timestamps : true,
});

module.exports = Order = mongoose.model('order', orderSchema);