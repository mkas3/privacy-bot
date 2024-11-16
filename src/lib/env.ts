import { z } from 'zod';

const envSchema = z.object({
  BOT_TOKEN: z.string(),
  ADMINS: z.string().transform((value) => value.split(',')),
  YANDEX_MAIL_MAIN: z.string(),
  YANDEX_PASSWORD_MAIN: z.string(),
  YANDEX_MAIL_SECOND: z.string(),
  YANDEX_PASSWORD_SECOND: z.string(),
  YANDEX_MAIL_THIRD: z.string(),
  YANDEX_PASSWORD_THIRD: z.string(),
  YANDEX_MAIL_WORK: z.string(),
  YANDEX_PASSWORD_WORK: z.string(),
  GOOGLE_MAIL: z.string(),
  GOOGLE_PASSWORD: z.string(),
  GOOGLE_MAIL_WORK: z.string(),
  GOOGLE_PASSWORD_WORK: z.string(),
  STEAM_NAME: z.string(),
  STEAM_PASSWORD: z.string(),
  NPM_USERNAME: z.string(),
  NPM_PASSWORD: z.string(),
  GITHUB_USERNAME: z.string(),
  GITHUB_PASSWORD: z.string(),
  VPN_VLESS: z.string(),
  DELETION_DELAY: z.coerce.number()
});

export const env = envSchema.parse(Bun.env);
