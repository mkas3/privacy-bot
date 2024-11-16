import type { BotContext } from '@/type/context.type';
import type { CommandMiddleware } from 'grammy';

import { InlineKeyboard } from 'grammy';

export const securityFoldersCommand: CommandMiddleware<BotContext> = async (ctx: BotContext) => {
  const keyboard = new InlineKeyboard()
    .text('Личные данные', 'security_folders_personal')
    .text('Рабочие данные', 'security_folders_work');

  await ctx.reply('Выберите папку для входа:', {
    reply_markup: keyboard
  });
};
