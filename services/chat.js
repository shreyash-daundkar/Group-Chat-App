const { Op } = require('sequelize');

const Chat = require('../models/chat');
const User = require('../models/user');
const Group = require('../models/group');


exports.getLatestChats = async options => {
    try {
        const { groupId, limit, lastMsgId } = options;
        
        const chats = await Chat.findAll({
            where: {
                id: {
                    [Op.gt]: lastMsgId,
                },
            },
            include: [
                {
                    model: Group,
                    where: { id: groupId },
                },
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

exports.addChat = async options => {
    try {
        const { message, imageUrl, groupId, userId } = options;

        const res = await Chat.create({ message, imageUrl, groupId, userId });

        return res;

    } catch (error) {
        console.error(error.stack);
        throw error;
    }
}