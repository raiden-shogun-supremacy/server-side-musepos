const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
    menuName : {
        type : String,
        required : true 
    } ,
    priceUnit : {
        type : Number,
        required : true 
    } ,
    imgUrl : {
        type : String , 
        required : true 
    } ,
    menuCategory : {
        type : String ,
        require : true
    } ,
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

module.exports = Menu = mongoose.model('menu', MenuSchema);