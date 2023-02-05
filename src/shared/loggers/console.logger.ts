import Log from './log.model';
import Logger from './logger';

export default class ConsoleLogger extends Logger {
  private static __instance: Logger;

  static get instance(): Logger {
    return this.__instance || (this.__instance = new this());
  }

  log(info: Log) {
    switch (info.level) {
      case 'info':
        this.logInfo(info.message);
      case 'warning':
        this.logWarn(info.message);
      case 'error':
        this.logError(info.message);
    }
  }

  logInfo(message: string) {
    console.info(message);
  }

  logWarn(message: string) {
    console.warn(message);
  }

  logError(message: string) {
    console.error(message);
  }
}

