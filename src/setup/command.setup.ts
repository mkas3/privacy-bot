import type { Bot } from 'grammy';

import { securityFoldersCommand } from '@/command/security-folders.command';
import { securityPersonalCommand } from '@/command/security-personal.command';
import { securityWorkCommand } from '@/command/security-work.command';
import { startCommand } from '@/command/start.command';

import { logger } from '@/lib/logger';

const defaultCommands = {
  'start': { command: startCommand, description: 'Запустить бота' },
  'security': { command: securityFoldersCommand, description: 'Выбрать папку' },
  'security-personal': { command: securityPersonalCommand, description: 'Выбрать данные' },
  'security-work': { command: securityWorkCommand, description: 'Выбрать данные' }
};

export const setupCommands = async (bot: Bot) => {
  Object.entries(defaultCommands).forEach(
    ([command, middleware]) => {
      bot.command(command, middleware.command);
    }
  );

  try {
    await bot.api.setMyCommands(
      Object.entries(defaultCommands).map(([key, value]) => ({
        ...value,
        command: key
      }))
    );
  } catch {
    logger.error('Error setup commands description');
  }

  logger.info('Setup commands');
};
