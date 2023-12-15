const Chat = require('../models/chat');
const User = require('../models/user');


exports.getChats = async options => {
    try {
        const { groupId } = options;
        
        const chats = await Chat.findAll({
            where: { groupId },
            include: [{
                model: User,
                attributes: ['id', 'username'],
            }],
        });

        return chats;
    } catch (error) {
        throw error;
    }
};


exports.addChat = async options => {
    try {
        const { message, imageUrl, groupId, userId } = options;

        const res = await Chat.create({ message, imageUrl, groupId, userId });

        return res;

    } catch (error) {
        throw error;
    }
}