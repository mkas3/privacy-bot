import type { BotContext } from '@/type/context.type';
import type { Bot } from 'grammy';

import { loggerMiddleware } from '@/middleware/logger.middleware';
import { onlyAdminMiddleware } from '@/middleware/only-admin.middleware';

import { composer } from '@/lib/composer';
import { logger } from '@/lib/logger';

const defaultMiddlewares = [loggerMiddleware, onlyAdminMiddleware];

export const setupMiddlewares = (bot: Bot<BotContext>) => {
  defaultMiddlewares.forEach(
    (middleware) => composer.use(middleware)
  );

  logger.info('Setup middlewares');

  bot.use(composer);
};
