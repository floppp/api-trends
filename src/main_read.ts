import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

import Server from './api/server';
import readRouter from './api/routes/read.routes';
import ConsoleLogger from './shared/loggers/console.logger';

const log = ConsoleLogger.instance;

const port = process.env.PORT_READ ? +process.env.PORT_READ : 4001;
const server = Server.instance;
server.register(readRouter());

server.start(port, () => log.logInfo('Server READ running'));
