const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShopSchema = new Schema({
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "user",
    }
});

const ShopSchema = mongoose.model('shop', ShopSchema);