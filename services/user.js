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
        throw error;
    }
}


exports.addUser = async options => {
    try {
        const { user } =  options;
        await User.create(user);

        return;
    } catch (error) {
        throw error
    }
}


exports.updatePassword = async options => {
    try {
        const { userId, password } =  options;
        
        const user = await User.findByPk(userId);

        user.password = password;

        await user.save();
        return;

    } catch (error) {
        throw error
    }
}