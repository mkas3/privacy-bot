import type { BotContext } from '@/type/context.type';
import type { CommandMiddleware } from 'grammy';

import { InlineKeyboard } from 'grammy';

export const handleSecurityWork = async (ctx: BotContext) => {
  const keyboard = new InlineKeyboard()
    .text('Google', 'security_work_google')
    .text('Yandex', 'security_work_yandex');

  await ctx.reply('Выберите платформу для входа:', {
    reply_markup: keyboard
  });
};

export const securityWorkCommand: CommandMiddleware<BotContext> = async (ctx) => {
  return handleSecurityWork(ctx);
};
