const { getLatestChats, addChat } = require('../services/chat');


exports.getChats = async (req, res, next) => {
    try {
        const groupId = parseInt(req.query.groupId);
        const lastMsgId  = parseInt(req.query.lastMsgId);

        let chats = await getLatestChats({ groupId, limit: 10, lastMsgId });
        
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

exports.addChat = async (io, socket, data) => {
    try {
        const { message, groupId } = data;

        console.log(message);

        if( message ) {

            const chat = await addChat({ 
                message: message, 
                groupId: groupId,
                userId: socket.user.id,
            });

            io.emit('recived-chat', { data: chat , success: true });
        } else {
            return socket.emit('error', { message: 'message can not be empty', success: false });
        }
    } catch (error) {
        console.error(error.stack);
        return socket.emit('error', { message: 'Error sending chat', success: false });
    }
}