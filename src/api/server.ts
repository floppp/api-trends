import express, { Router, Request, Response, NextFunction } from 'express';
import bodyParser = require('body-parser');
import helmet from 'helmet';
import ConsoleLogger from '../shared/loggers/console.logger';

const log = ConsoleLogger.instance;

export default class Server {
  private static __instance: Server;
  readonly app: express.Application;

  private constructor() {
    log.logInfo('Running new server instance');
    this.app = express();
    this.app.use(helmet());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
  }

  register(...routers: Router[]): void {
    for (const router of routers)
      this.app.use(router);
  }

  static get instance(): Server {
    return this.__instance || (this.__instance = new this());
  }

  start(port: number, cb: () => void): void {
    this.app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
      log.logError(error.message);
      // Sending generic message to avoid leaking info.
      res.status(404).send({msg: 'Resource not found'});
    })
    this.app.listen(port, cb);
  }
}
