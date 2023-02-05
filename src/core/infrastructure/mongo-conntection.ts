import { Document, Db, MongoClient, MongoError } from 'mongodb';
import ConsoleLogger from '../../shared/loggers/console.logger';

const dbName = 'api-feed';
type Databases = typeof dbName;
type Collection = 'feed';

let db: { [key in Databases]: Db } = {} as { [key in Databases]: Db };

const log = new ConsoleLogger();

let mongoClient: { [key: string]: MongoClient } = {};

const initMongoDB = (dbName: Databases) => {
  mongoClient[dbName] = new MongoClient(process.env.MONGO_URI || '');

  mongoClient[dbName]
    .connect((err: MongoError) => {
      if (err) {
        log.logError(`No se ha podido establecer la co nexión con Mongo ${dbName}`);
        log.logError(err.message);
        log.logError(err?.errmsg ?? '');

        process.exit();
      }

      log.logInfo(`Conectado a MongoDB (${dbName})`);
      db[dbName] = mongoClient[dbName].db(dbName);
    });

  process
    .on('SIGINT', function () {
      mongoClient[dbName].close();
      log.logWarn(`Mongodb disconnected from ${dbName} on app termination - SIGINT`);
      process.exit(1);
    })
    .on('SIGTERM', function () {
      mongoClient[dbName].close();
      log.logWarn(`Mongodb disconnected from ${dbName} on app termination - SIGTERM`);
      process.exit(1);
    })
    .on('SIGUSR2', function () {
      mongoClient[dbName].close();
      log.logWarn(`Mongodb disconnected from ${dbName} on app termination - SIGUSR2`);
      process.exit(1);
    })
    .on('SIGHUP', function () {
      mongoClient[dbName].close();
      log.logWarn(`Mongodb disconnected from ${dbName} on app termination - SIGHUP`);
      process.exit(1);
    });
};

function aggregate(col: Collection, pipeline: any[]): Promise<Document[]> {
  return db[dbName].collection(col).aggregate(pipeline).toArray();
}

function find(col: Collection, criteria: Partial<T>): Promise<Document[]> {
  return db[dbName].collection(col).find(criteria).toArray();
}

export { Databases, db, initMongoDB, aggregate, find };
