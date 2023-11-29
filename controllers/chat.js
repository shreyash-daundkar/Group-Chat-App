const { getChats, addChat } = require('../services/chat');


exports.getChats = async (req, res, next) => {
    try {
        const chats = await getChats();
        
        let chatsData;
        if(chats.length !== 0) {
            
            chatsData = chats.map(chat => {
                const { message, user: { id, username } } = chat;
                return { 
                    message,
                    username,
                    isCurrUser: id === req.user.id
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

        if( message ) {
            const chat = await addChat({ message, userId: req.user.id});
            res.status(200).json({ data: chat, success: true });

        } else {
            res.status(200).json({ message: 'message can not be empty', success: true });
        }
        res.status(200).json({ data: chatsData, success: true });
    } catch (error) {
        next(error);
    }
}