import { MongoClient } from 'mongodb';
import ConsoleLogger from '../../shared/loggers/console.logger';

const dbName = 'api-feed';
type Databases = typeof dbName | `${typeof dbName}_test`;

const log = ConsoleLogger.instance;

let mongoClients: { [key in Databases]: MongoClient } = {} as { [key in Databases]: MongoClient };

const initMongoDB = (dbName: Databases, uri: string) => {
  mongoClients[dbName] = new MongoClient(uri);

  process
    .on('SIGINT', function () {
      mongoClients[dbName].close();
      log.logWarn(`Mongodb disconnected from ${dbName} on app termination - SIGINT`);
      process.exit(1);
    })
    .on('SIGTERM', function () {
      mongoClients[dbName].close();
      log.logWarn(`Mongodb disconnected from ${dbName} on app termination - SIGTERM`);
      process.exit(1);
    })
    .on('SIGUSR2', function () {
      mongoClients[dbName].close();
      log.logWarn(`Mongodb disconnected from ${dbName} on app termination - SIGUSR2`);
      process.exit(1);
    })
    .on('SIGHUP', function () {
      mongoClients[dbName].close();
      log.logWarn(`Mongodb disconnected from ${dbName} on app termination - SIGHUP`);
      process.exit(1);
    });
};

export { Databases, initMongoDB, mongoClients };
