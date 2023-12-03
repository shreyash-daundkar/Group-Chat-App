const User = require('../models/user');


exports.getUsers = async options => {
    try {
        const whereClause = options.email ? { email: options.email } : {};

        const users = await User.findAll({
            where: whereClause,
        });

        return users;

    } catch (error) {
        console.error(error.stack);
        throw new Error('Error getting users');
    }
}


exports.addUser = async user => {
    try {
        User.create(user);
        return;

    } catch (error) {
        console.error(error.stack);
        throw new Error('Error creating user');
    }
}