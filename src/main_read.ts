import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

import Server from './api/server';
import feedRouter from './api/routes/feed.routes';
import ConsoleLogger from './shared/loggers/console.logger';
import { initMongoDB, mongoClients } from './core/infrastructure/mongo-connection';

const log = ConsoleLogger.instance;

log.logInfo(process.env.MONGO_URI ?? '')

// const dbName = 'api-feed';
// initMongoDB(dbName, process.env.MONGO_URI ?? '');
// const client = mongoClients[dbName];
// const db = client.db(dbName);

const port = process.env.PORT_READ ? +process.env.PORT : 4001;
const server = Server.instance;
server.register(readRouter());

server.start(port, () => log.logInfo('Server READ running'));


