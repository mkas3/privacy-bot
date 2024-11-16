import type { BotContext } from '@/type/context.type';
import type { CommandMiddleware } from 'grammy';

export const startCommand: CommandMiddleware<BotContext> = (ctx: BotContext) => {
  ctx.reply(
    'Добро пожаловать. Этот бот создан, чтобы помогать с вашей безопасностью. Чтобы начать, введите /security'
  );
};
