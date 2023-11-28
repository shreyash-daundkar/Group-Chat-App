const jwt = require('jsonwebtoken');


exports.signToken = obj => {
    try {
        const token = jwt.sign(obj, process.env.JWT_SECRET, { expiresIn: '10s'});
        return token;
    } catch (error) {
        console.error(error.stack);
        throw error;
    }
}

exports.verifyToken = token => {
    try {
        const obj = jwt.verify(token, process.env.JWT_SECRET);
        return obj;
    } catch (error) {
        console.error(error.stack);
        throw error;
    }
}