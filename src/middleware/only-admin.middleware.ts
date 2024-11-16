import type { BotContext } from '@/type/context.type';
import type { Middleware } from 'grammy';

import { env } from '@/lib/env';

export const onlyAdminMiddleware: Middleware<BotContext> = async (ctx, next) => {
  if (
    !ctx.chat
    || ['channel'].includes(ctx.chat.type)
    || ctx.from?.username === 'GroupAnonymousBot'
    || !ctx.from?.id
  ) return ctx.reply('Вы не являетесь администратором');

  const chatMember = await ctx.getChatMember(ctx.from.id);
  if (chatMember.user.username && env.ADMINS.includes(chatMember.user.username)) {
    return next();
  }

  return ctx.reply('Вы не являетесь администратором');
};
