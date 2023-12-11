const { CronJob } = require('cron');

const { movedOldChatToArichived } = require('../services/archivedChat');


exports.cronJob = CronJob.from({

	cronTime: '0 0 * * * ',

	onTick: movedOldChatToArichived,

	start: true,

	timeZone: 'Asia/Kolkata'
});