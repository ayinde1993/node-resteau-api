const JWT = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // get token from header
        JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => { 
            if(err) {
                return res.status(401).json({ 
                    success: false,
                    message: 'Unauthorized user',
                    error
                });
            } else {
                req.body.userId = decoded.userId; // add user id to request body
                next();
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'please provide a valid token',
            error 
        });
    }
}

module.exports = { authMiddleware };