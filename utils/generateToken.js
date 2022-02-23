const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({id}, "MusePOS", {
        expiresIn : '30d',
    })
}


module.exports = generateToken;