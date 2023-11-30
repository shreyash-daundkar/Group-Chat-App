const Chat = require('../models/chat');
const User = require('../models/user');

exports.getLatestChats = async options => {
    try {
        const { limit } = options;
        
        const chats = await Chat.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id', 'username'],
                },
            ],
            order: [['createdAt', 'DESC']],
            limit: limit,
        });

        return chats.reverse();
    } catch (error) {
        console.error(error.stack);
        throw error;
    }
};

exports.addChat = async chat => {
    try {
        const res = await Chat.create(chat);
        return res;
    } catch (error) {
        console.error(error.stack);
        throw error;
    }
}