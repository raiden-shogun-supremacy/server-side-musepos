const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    username : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    shopParticipate : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'shop',
        }
    ],

},{
    timestamps : true,
});


// Hashing password
UserSchema.pre('save', async function(next) {

    if(!this.isModified("password")){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Check whether passwords are matched
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = User = mongoose.model('user', UserSchema);