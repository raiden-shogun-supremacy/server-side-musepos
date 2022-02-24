const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShopSchema = new Schema({
    shopName : {
        type : String,
        required : true,
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
    },
    manager : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user',
        }

    ],
    employee : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user',
        }
    ],
    menu : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'menu',
        }
    ],
    order : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'order',
        }
    ]
},{
    timestamps : true,
});

module.exports  = Shop = mongoose.model('shop', ShopSchema);