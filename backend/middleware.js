const jwt = require('jsonwebtoken');
const config = require('./config/database.config');

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token) {
        jwt.verify(token, config.secret, (err, decode) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                })
            } else {
                req.decode = decode;
                console.log('this is request data from middleware - ', req.decode);
                console.log('this is request data from middleware params - ', req.params);
                console.log('this is request data from middleware headers - ', req.headers);
                next();
            }
        })
    } else {
        return res.status(500).send({
            success: false,
            message: 'Auth token in not supplied'
        })
    }
}

module.exports = { checkToken: checkToken };