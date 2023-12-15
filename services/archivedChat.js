const database = require('../utils/database');

const ArchivedChat = require('../models/archivedChat');
const Chat = require('../models/chat');
const User = require('../models/user');



exports.movedOldChatToArichived = async () => {
    let t;
  try {
    t = await database.transaction();
     
    const chats = await Chat.findAll();

    await ArchivedChat.bulkCreate(chats.map(chat => chat.toJSON()), {transaction: t});

    const ChatId = chats.map(chat => chat.id);
    await Chat.destroy({
        where: {
            id: ChatId,
        },
        transaction: t,
    });

    await t.commit();
    return;
      
  } catch (error) {

    await t.rollback();
    throw error;
  }
}


exports.getArchivedChats = async options => {
    try {
        const { groupId } = options;
        
        const chats = await ArchivedChat.findAll({
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