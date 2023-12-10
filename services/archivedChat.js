const ArchivedChat = require('../models/archivedChat');

exports.saveToArchivedChat = async options => {
    try {
        const { chats } = options;

        await ArchivedChat.bulkCreate(chats.map(chat => chat.toJSON()));

        return;
    } catch (error) {
        console.error(error.stack);
        throw error;
    }
}