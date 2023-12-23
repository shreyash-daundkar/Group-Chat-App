const { v4 } = require('uuid');

const ForgotPassword = require('../models/forgotPassword');



exports.activateForgotPassword = async options => {
    try {
        const { userId } = options;

        const { id } = await ForgotPassword.create({
            id: v4(),
            userId,
            isActive: true,
        });

        return id;

    } catch (error) {
        throw error
    }
}


exports.deactivateForgotPassword = async options => {
    try {
        const { forgotPasswordId } = options;

        const forgotPassword = await ForgotPassword.findByPk(forgotPasswordId);
        
        if(!forgotPassword.isActive) return null;

        forgotPassword.isActive = false;

        forgotPassword.save();

        return forgotPassword.userId;
        
    } catch (error) {
        throw error
    }
}