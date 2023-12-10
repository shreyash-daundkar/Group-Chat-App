const { CronJob } = require('cron').CronJob;

const { getChats, deleteChat } = require('../services/chat');
const { saveToArchivedChat } = require('../services/archivedChat');

const job = new CronJob(
  '0 0 * * *',
  async function () {
    try {
        const chats = await getChats({ groupId });

        await saveToArchivedChat({ chats });

        chats.forEach( chat => deleteChat({ chat }));
        
    } catch (error) {
        console.error(error.stack);
        throw error;
    }
  },
  null,
  true,
  'Asia/Kolkata'
);

job.start();