const { hashPassword, comparePassword } = require("../services/bcrypt");
const { getUsers, addUser } = require("../services/user");

exports.addUser = async (req, res, next) => {
    try {
        const user = req.body;

        const users = await getUsers({where: {email: user.email}});
        if (users.length !== 0) {
            return res.status(400).json({ message: "Email already exists", success: false });
        }
        
        user.password = await hashPassword(user.password);

        await addUser(user);
        res.status(201).json({ success: true });

    } catch (error) {
        next(error);
    }
};


exports.verifyUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const users = await getUsers({where: {email}});
        if (users.length !== 0) {

            const isPasswordCorrect =await comparePassword(password, users[0].password);
            if (isPasswordCorrect) {

                return res.status(201).json({ success: true });
                
            } else {
                return res.status(400).json({ message: "Password is incorrect", success: false });
            }  

        } else {
            return res.status(400).json({ message: "Email does not exists", success: false });
        }

        
    } catch (error) {
        next(error);
    }
}