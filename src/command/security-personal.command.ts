import type { BotContext } from '@/type/context.type';
import type { CommandMiddleware } from 'grammy';

import { InlineKeyboard } from 'grammy';

export const handleSecurityPersonal = async (ctx: BotContext) => {
  const keyboard = new InlineKeyboard()
    .text('Google', 'security_google')
    .text('Steam', 'security_steam')
    .text('npm', 'security_npm')
    .text('GitHub', 'security_github')
    .row()
    .text('Yandex 1', 'security_yandex_main')
    .text('Yandex 2', 'security_yandex_secondary')
    .text('Yandex 3', 'security_yandex_third')
    .text('VPN', 'security_vpn');

  await ctx.reply('Выберите платформу для входа:', {
    reply_markup: keyboard
  });
};

export const securityPersonalCommand: CommandMiddleware<BotContext> = async (ctx) => {
  return handleSecurityPersonal(ctx);
};
