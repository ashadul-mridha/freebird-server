const jwt = require("jsonwebtoken");
const User = require('../../models/user');

// auth guard to protect routes that need authentication
const checkLogin = async (req, res, next) => {

    try {
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ){
             // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token and set it user
            req.user = await User.findById(decoded.userid).select('-password')

            next()
        } else {
            res.send({
                status: false,
                message: "Not Authorize",
                data : null,
                statusCode: 500
            })
        }
    } catch (error) {
        res.send({
            status: false,
            message: "Not Authorize",
            data : null,
            statusCode: 500
        })
    }

};


module.exports = {
  checkLogin
};