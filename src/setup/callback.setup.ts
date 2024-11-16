import type { BotContext } from '@/type/context.type';
import type { Bot } from 'grammy';

import { securityFoldersCallback } from '@/callback/security-folders.callback';
import { securityCallback } from '@/callback/security.callback';

import { logger } from '@/lib/logger';

const defaultCallbacks = {
  'security': { callback: securityCallback, pattern: /^security_(google|yandex_main|yandex_secondary|npm|github|vpn|steam|delete_message|work_google|work_yandex)(_reveal)?$/ },
  'security-folders': { callback: securityFoldersCallback, pattern: /^security_folders_(personal|work)$/ }
};

export const setupCallbacks = (bot: Bot<BotContext>) => {
  Object.entries(defaultCallbacks).forEach(([, value]) => {
    bot.callbackQuery(value.pattern, value.callback);
  });

  logger.info('Setup callbacks');
};
