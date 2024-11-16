import type { Bot } from 'grammy';

import { unknownMessage } from '@/message/unknown.message';

import { logger } from '@/lib/logger';

const defaultMessages = {
  message: unknownMessage
};

export const setupMessages = (bot: Bot) => {
  Object.entries(defaultMessages).forEach(([message, middleware]) => {
    bot.on(message as keyof typeof defaultMessages, middleware);
  });

  logger.info('Setup messages');
};
