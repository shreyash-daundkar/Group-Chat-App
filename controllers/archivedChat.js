const { getArchivedChats } = require('../services/archivedChat');


exports.getArchivedChats = async (req, res, next) => {
    try {
        const groupId = parseInt(req.query.groupId);

        let chats = await getArchivedChats({ groupId });
        
        let chatsData = [];
        if(chats.length !== 0) {
            
            chatsData = chats.map(chat => {
                const { id, message, imageUrl, userId, user, createdAt } = chat;
                return { 
                    id,
                    message,
                    imageUrl,
                    userId,
                    username: user.username,
                    date: createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                    time: createdAt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
                }
            });
        }

        res.status(200).json({ data: chatsData, success: true });
    } catch (error) {
        next(error);
    }
}