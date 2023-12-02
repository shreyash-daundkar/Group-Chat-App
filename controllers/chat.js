const { getLatestChats, addChat } = require('../services/chat');


exports.getChats = async (req, res, next) => {
    try {
        const groupId = parseInt(req.query.groupId);
        const lastMsgId  = parseInt(req.query.lastMsgId);

        let chats = await getLatestChats({ groupId, limit: 10 });
        
        chats = chats.filter(chat => chat.id > lastMsgId)
        
        let chatsData = [];
        if(chats.length !== 0) {
            
            chatsData = chats.map(chat => {
                const { id, message, user } = chat;
                return { 
                    id,
                    message,
                    username: user.username,
                    isCurrUser: user.id === req.user.id
                }
            });
        }

        res.status(200).json({ data: chatsData, success: true });
    } catch (error) {
        next(error);
    }
}

exports.addChat = async (req, res, next) => {
    try {
        const { message } = req.body;
        const groupId = parseInt(req.query.groupId);

        if( message ) {
            const chat = await addChat({ message, userId: req.user.id, groupId});
            res.status(200).json({ data: chat, success: true });

        } else {
            res.status(200).json({ message: 'message can not be empty', success: true });
        }
        res.status(200).json({ data: chatsData, success: true });
    } catch (error) {
        next(error);
    }
}