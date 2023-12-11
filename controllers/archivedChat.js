const { getArchivedChats } = require('../services/archivedChat');


exports.getArchivedChats = async (req, res, next) => {
    try {
        const groupId = parseInt(req.query.groupId);

        let chats = await getArchivedChats({ groupId });
        
        let chatsData = [];
        if(chats.length !== 0) {
            
            chatsData = chats.map(chat => {
                const { id, message, imageUrl, userId, user } = chat;
                return { 
                    id,
                    message,
                    imageUrl,
                    userId,
                    username: user.username,
                }
            });
        }

        res.status(200).json({ data: chatsData, success: true });
    } catch (error) {
        next(error);
    }
}