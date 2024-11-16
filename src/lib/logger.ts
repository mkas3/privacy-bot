import pino from 'pino';

export const logger = pino({
  name: 'mkas3-bot',
  customLevels: {
    messages: 35,
    success: 37
  },
  transport: {
    target: 'pino-pretty',
    options: {
      customColors: {
        default: 'white',
        trace: 'bgRed',
        error: 'red',
        warn: 'yellow',
        info: 'green',
        debug: 'gray',
        messages: 'yellow',
        success: 'bgYellow'
      },
      colorize: true,
      customLevels: {
        debug: 10,
        info: 30,
        warn: 40,
        error: 50,
        trace: 60,
        messages: 35,
        success: 37
      },
      levelFirst: true,
      translateTime: 'HH:MM:ss',
      ignore: 'pid,hostname'
    }
  }
});
