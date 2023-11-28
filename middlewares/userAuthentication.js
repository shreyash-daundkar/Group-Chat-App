const { verifyToken } = require('../services/jwt');

exports.userAuth = (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized - Token not found in cookie', success: false });
        }
        req.user = verifyToken(token);
        console.log(req.user);
        next();
    } catch (error) {
        next(error);
    }
}