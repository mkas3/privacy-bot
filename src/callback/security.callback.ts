import type { BotContext } from '@/type/context.type';
import type { CallbackQueryMiddleware } from 'grammy';

import { env } from '@/lib/env';
import { logger } from '@/lib/logger';

const escapeMarkdown = (text: string) => {
  return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, '\\$&');
};

export const securityCallback: CallbackQueryMiddleware<BotContext> = async (ctx) => {
  const action = ctx.callbackQuery.data;

  try {
    let sentMessage;
    let messageText = '';
    const isRevealed = action.endsWith('_reveal') || action === 'security_delete_message';
    const baseAction = isRevealed ? action.replace('_reveal', '') : action;

    if (isRevealed) {
      switch (baseAction) {
        case 'security_google':
          messageText = `📧 Почта: \`\`\`${escapeMarkdown(env.GOOGLE_MAIL)}\`\`\`\n🔑 Пароль: \`\`\`${escapeMarkdown(env.GOOGLE_PASSWORD)}\`\`\``;
          break;
        case 'security_work_google':
          messageText = `📧 Почта: \`\`\`${escapeMarkdown(env.GOOGLE_MAIL_WORK)}\`\`\`\n🔑 Пароль: \`\`\`${escapeMarkdown(env.GOOGLE_PASSWORD_WORK)}\`\`\``;
          break;
        case 'security_yandex_main':
          messageText = `📧 Почта: \`\`\`${escapeMarkdown(env.YANDEX_MAIL_MAIN)}\`\`\`\n🔑 Пароль: \`\`\`${escapeMarkdown(env.YANDEX_PASSWORD_MAIN)}\`\`\``;
          break;
        case 'security_yandex_secondary':
          messageText = `📧 Почта: \`\`\`${escapeMarkdown(env.YANDEX_MAIL_SECOND)}\`\`\`\n🔑 Пароль: \`\`\`${escapeMarkdown(env.YANDEX_PASSWORD_SECOND)}\`\`\``;
          break;
        case 'security_yandex_third':
          messageText = `📧 Почта: \`\`\`${escapeMarkdown(env.YANDEX_MAIL_THIRD)}\`\`\`\n🔑 Пароль: \`\`\`${escapeMarkdown(env.YANDEX_PASSWORD_THIRD)}\`\`\``;
          break;
        case 'security_work_yandex':
          messageText = `📧 Почта: \`\`\`${escapeMarkdown(env.YANDEX_MAIL_WORK)}\`\`\`\n🔑 Пароль: \`\`\`${escapeMarkdown(env.YANDEX_PASSWORD_WORK)}\`\`\``;
          break;
        case 'security_steam':
          messageText = `👨‍🦳 Имя: \`\`\`${escapeMarkdown(env.STEAM_NAME)}\`\`\`\n🔑 Пароль: \`\`\`${escapeMarkdown(env.STEAM_PASSWORD)}\`\`\``;
          break;
        case 'security_npm':
          messageText = `👨‍💻 Имя: \`\`\`${escapeMarkdown(env.NPM_USERNAME)}\`\`\`\n🔑 Пароль: \`\`\`${escapeMarkdown(env.NPM_PASSWORD)}\`\`\``;
          break;
        case 'security_github':
          messageText = `👨‍💻 Имя: \`\`\`${escapeMarkdown(env.GITHUB_USERNAME)}\`\`\`\n🔑 Пароль: \`\`\`${escapeMarkdown(env.GITHUB_PASSWORD)}\`\`\``;
          break;
        case 'security_vpn':
          messageText = `🔑 VLESS: \`\`\`${escapeMarkdown(env.VPN_VLESS)}\`\`\``;
          break;
        case 'security_delete_message':
          await ctx.editMessageText('Удалено, так как скопировано');
          await ctx.answerCallbackQuery();
          return;
      }
    } else {
      messageText = '🔒 Нажмите кнопку «Открыть», чтобы показать данные';
    }

    if (messageText) {
      const keyboard = isRevealed
        ? [[{ text: '✂️ Скопировано', callback_data: 'security_delete_message' }]]
        : [[{ text: '🔓 Открыть', callback_data: `${action}_reveal` }]];

      sentMessage = await ctx.editMessageText(messageText, {
        parse_mode: 'MarkdownV2',
        reply_markup: {
          inline_keyboard: keyboard
        }
      });
    }

    await ctx.answerCallbackQuery();

    if (sentMessage && isRevealed) {
      setTimeout(() => {
        void (async () => {
          try {
            await ctx.api.editMessageText(
              ctx.chat!.id,
              sentMessage.message_id,
              'Удалено по истечению 5 минут'
            );
          } catch (error) {
            logger.error('Error replacing message:', error);
          }
        })();
      }, env.DELETION_DELAY);
    }
  } catch (error) {
    await ctx.answerCallbackQuery('Произошла ошибка при получении данных');
    logger.error('Security callback error:', error);
  }
};
