const jwt = require('jsonwebtoken');
const UserSchema = require('../models/user.model');

// THIS FUNTION WILL BE PASSED BEFORE THE ROUTE ACTION.
const protect = async (req, res, next) => {
    // initialize token for using later
    let token;

    // if it has token
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1];

            // verify token by checking token with secret message
            // Token only contains id because we assign it to do only this in utils/generateToken.js
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            // get all of data except the password attribute
            req.user = await UserSchema.findById(decodedToken.id).select("-password");

            next();

            
        } catch (err) {
            res.status(401);

            throw new Error("Not authorized, token failed"); // something wrong with token
        }
    }

    // if there is no token.
    if(!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
}



module.exports = protect;