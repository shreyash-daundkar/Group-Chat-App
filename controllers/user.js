const { getUsers, addUser } = require("../services/user");
const { hashPassword, comparePassword } = require("../utils/bcrypt");
const { signToken } = require('../utils/jwt');

exports.addUser = async (req, res, next) => {
    try {
        const user = req.body;

        const users = await getUsers({ email: user.email });
        
        if (users.length !== 0) {
            return res.status(400).json({ message: "Email already exists", success: false });
        }
        
        user.password = await hashPassword(user.password);

        await addUser({ user });
        res.status(201).json({ success: true });

    } catch (error) {
        next(error);
    }
};


exports.verifyUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const users = await getUsers({ email });
        if (users.length !== 0) {

            const isPasswordCorrect =await comparePassword(password, users[0].password);
            if ( isPasswordCorrect ) {  
                
                const token = signToken({ id: users[0].id });

                return res.status(200).json({ data: { id: users[0].id, token }, success: true });
            } else {
                return res.status(401).json({ message: "Password is incorrect", success: false });
            }  
        } else {
            return res.status(400).json({ message: "Email does not exists", success: false });
        }    
    } catch (error) {
        next(error);
    }
}


exports.getUsers = async (req, res, next) => {
    try {
        const users = await getUsers({});

        const data = users.filter(user => user.id !== req.user.id);

        res.status(200).json({ data, success: true});

    } catch (error) {
        next(error);
    }
}