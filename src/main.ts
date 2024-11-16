import { Bot } from 'grammy';

import { env } from './lib/env';
import { logger } from './lib/logger';
import { setupBot } from './setup/bot.setup';

const bot = new Bot(env.BOT_TOKEN);

logger.info('Starting bot');

setupBot(bot).then(() => {
  bot.start();
  logger.success('Started bot');
});
