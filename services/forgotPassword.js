const { v4 } = require('uuid');

const ForgotPassword = require('../models/forgotPassword');


exports.activeForgotPassword = async options => {
    try {
        const { userId } = options;

        const { id } = await ForgotPassword.create({
            id: v4(),
            userId,
        });

        return id;

    } catch (error) {
        throw error
    }
}