const { activateForgotPassword, deactivateForgotPassword  } = require('../services/forgotPassword');
const { getUsers, updatePassword } = require('../services/user');
const { sendMail } = require('../services/sib');

const { hashPassword } = require('../utils/bcrypt');


exports.sendMail = async (req, res, next) => {
    try {
        const { email } = req.body;
        const users = await getUsers({ email });

        if(users.length === 0) {
            return res.status(404).json({ 
                message: 'User not found with this email',
                success: false,
            });
        }

        const userId = users[0].id;
        const forgotPasswordId = await activateForgotPassword({ userId });

        await sendMail({ email, forgotPasswordId });

        res.status(200).json({ success: true });
        
    } catch (error) {
        next(error);
    }
}


exports.resetPassword = async (req, res, next) => {
    try {
        const { password, forgotPasswordId } = req.body;
        
        const userId = await deactivateForgotPassword({ forgotPasswordId });
        
        if(!userId) {
            return res.status(404).json({ 
                message: 'Forgot password request is not activated', 
                success: false,
            });
        }

        password = await hashPassword(password);

        await updatePassword({ userId, password });
    
        res.status(200).json({ success: true });

    } catch (error) {
        next(error)
    }
}