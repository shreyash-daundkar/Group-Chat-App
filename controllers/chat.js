const { getLatestChats, addChat } = require('../services/chat');


exports.getChats = async (req, res, next) => {
    try {
        const groupId = parseInt(req.query.groupId);
        const lastMsgId  = parseInt(req.query.lastMsgId);

        let chats = await getLatestChats({ groupId, limit: 10, lastMsgId });
        
        let chatsData = [];
        if(chats.length !== 0) {
            
            chatsData = chats.map(chat => {
                const { id, message, userId, user } = chat;
                return { 
                    id,
                    message,
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

exports.addChat = async (groupNamespace, socket, data) => {
    try {
        if( data.message ) {

            const { id, message, userId } = await addChat({ 
                message: data.message, 
                groupId: data.groupId,
                userId: socket.user.id,
            });

            chat = {
                id,
                message,
                userId,
                username: socket.user.username,
            }
            
            return groupNamespace.to(data.groupId).emit('received-chat', { data: chat , success: true });

        } else {
            return socket.emit('error', { message: 'message can not be empty', success: false });
        }
    } catch (error) {
        console.error(error.stack);
        return socket.emit('error', { message: 'Error sending chat', success: false });
    }
}