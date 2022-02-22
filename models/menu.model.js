const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuSchema = new Schema({

    menuName : {
        type : String ,
        required : true 
    } ,
    priceUnit : {
        type : Number ,
        required : true 
    } ,
    imgUrl : {
        type : String , 
        required : true 
    } ,
    stockAmount : {
        type : Number , 
        required : true 
    } , 
    parentStock : {
        type : Schema.Types.ObjectId ,
        ref : 'stock' ,
    }

});

module.exports = Menu= mongoose.model('menu', MenuSchema);

