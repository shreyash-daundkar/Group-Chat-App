const database = require('../utils/database');

const ArchivedChat = require('../models/archivedChat');
const Chat = require('../models/chat');



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
    console.error(error.stack);
    throw error;
  }
}