import type { BotContext } from '@/type/context.type';
import type { Middleware } from 'grammy';

import { logger } from '@/lib/logger';

export const loggerMiddleware: Middleware<BotContext> = async (ctx, next) => {
  const originalReply = ctx.reply.bind(ctx);

  ctx.reply = async (text: string, ...args: any[]) => {
    const result = await originalReply(text, ...args);
    ctx.bot = { response: { text } };

    const botInfo = await ctx.api.getMe();
    logger.messages(`\nUser (${ctx.from?.username}): ${ctx.message?.text}\nBot (${botInfo.username}): ${text}`);

    return result;
  };

  await next();
};
