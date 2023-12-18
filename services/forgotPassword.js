const { v4 } = require('uuid');

const ForgotPassword = require('../models/forgotPassword');



exports.activeForgotPassword = async options => {
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


exports.deactiveForgotPassword = async options => {
    try {
        const { id } = options;

        const forgotPassword = await ForgotPassword.findByPk(id);
        
        forgotPassword.isActive = false;

        forgotPassword.save();

        return;

    } catch (error) {
        throw error
    }
}