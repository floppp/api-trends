import Log from './log.model';

export default abstract class Logger {
  abstract log(info: Log): void;
  abstract logInfo(message: string): void;
  abstract logWarn(message: string): void;
  abstract logError(message: string): void;
}
