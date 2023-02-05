import express, { Router } from 'express';
import ConsoleLogger from '../shared/loggers/console.logger';

const log = ConsoleLogger.instance;

export default class Server {
  private static __instance: Server;
  readonly app: express.Application;

  private constructor() {
    log.logInfo('Running new server instance');
    this.app = express();
  }

  register(router: Router): void {
    this.app.use(router);
  }

  static get instance(): Server {
    return this.__instance || (this.__instance = new this());
  }

  start(port: number, cb: () => void): void {
    this.app.listen(port, cb);
  }
}
