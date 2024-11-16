import type { Context } from 'grammy';

export type BotResponseContext = {
  bot?: {
    response?: {
      text?: string;
    };
  };
};

export type BotContext = BotResponseContext & Context;
