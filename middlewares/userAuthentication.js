const { verifyToken } = require('../services/jwt');
const { getUsers } = require('../services/user');

exports.userAuth = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized - Token not found in cookie', success: false });
        }

        const id = verifyToken(token).id;
        const users = await getUsers({
            where: { id },
        });

        if (users.length !== 0) {
            req.user = users[0];
        } else {
            return res.status(404).json({ message: 'User not found' , success: false })
        }

        next();
    } catch (error) {
        next(error);
    }
}