import type { BotContext } from '@/type/context.type';
import type { Middleware } from 'grammy';

export const unknownMessage: Middleware<BotContext> = (ctx: BotContext) => {
  ctx.reply('Неизвестная команда');
};
