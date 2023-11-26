const User = require('../models/user');


exports.getUsers = async options => {
    try {
        const users = await User.findAll(options);
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