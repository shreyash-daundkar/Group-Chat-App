const Chat = require('../models/chat');
const User = require('../models/user');

exports.getChats = async options => {
    try {

        const chats = await Chat.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id', 'username'],
                },
            ],
            order: [['createdAt', 'DESC']],
            limit: 10,
        });

        return chats;
    } catch (error) {
        console.error(error.stack);
        throw error;
    }
}

exports.addChat = async chat => {
    try {
        const res = await Chat.create(chat);
        return res;
    } catch (error) {
        console.error(error.stack);
        throw error;
    }
}