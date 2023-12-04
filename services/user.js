const User = require('../models/user');


exports.getUsers = async options => {
    try {
        const whereClause = options.hasOwnProperty('email') 
            ? { email: options.email } 
            : options.hasOwnProperty('id')
            ? {id : options.id}
            : {};

        const users = await User.findAll({
            where: whereClause,
        });

        return users;

    } catch (error) {
        console.error(error.stack);
        throw new Error('Error getting users');
    }
}


exports.addUser = async options => {
    try {
        const { user } =  options;
        User.create(user);

        return;
    } catch (error) {
        console.error(error.stack);
        throw new Error('Error creating user');
    }
}