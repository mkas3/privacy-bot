import type { BotContext } from '@/type/context.type';
import type { Bot } from 'grammy';

import { logger } from '@/lib/logger';

import { setupCallbacks } from './callback.setup';
import { setupCommands } from './command.setup';
import { setupMessages } from './message.setup';
import { setupMiddlewares } from './middleware.setup';

export const setupBot = async (bot: Bot<BotContext>) => {
  setupMiddlewares(bot);
  await setupCommands(bot);
  setupMessages(bot);
  setupCallbacks(bot);

  logger.info('Setup bot');
};
