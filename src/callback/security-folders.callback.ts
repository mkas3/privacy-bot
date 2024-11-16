import type { BotContext } from '@/type/context.type';
import type { CallbackQueryMiddleware } from 'grammy';

import { handleSecurityPersonal } from '@/command/security-personal.command';
import { handleSecurityWork } from '@/command/security-work.command';

export const securityFoldersCallback: CallbackQueryMiddleware<BotContext> = async (ctx) => {
  const action = ctx.callbackQuery.data;

  switch (action) {
    case 'security_folders_personal':
      await ctx.answerCallbackQuery();
      await handleSecurityPersonal(ctx);
      break;
    case 'security_folders_work':
      await ctx.answerCallbackQuery();
      await handleSecurityWork(ctx);
      break;
  }
};
