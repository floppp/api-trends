import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

import ConsoleLogger from './shared/loggers/console.logger';
import { initMongoDB, mongoClients } from './core/infrastructure/mongo-connection';

const log = ConsoleLogger.instance;

log.logInfo(process.env.MONGO_URI ?? '')

// initMongoDB('api-feed', process.env.MONGO_URI ?? '');
// const client = mongoClients['api-feed'];
// // client
// //   .db("admin")
// //   .command({ ping: 1 })
// //   .then(data => {
// //     log.logInfo(JSON.stringify(data));
// //   })
// //   .catch(err => {
// //     log.logError(err.message);
// //   })

// const doc = { name: "Neapolitan pizza", shape: "round" };

// const cursor = client.db('api-feed')
//   .collection('feed')
//   .find<any>({})
//   // .then(result => {
//   //   log.logInfo(
//   //     `A document was inserted with the _id: ${result.insertedId}`,
//   //   )
//   // })
//   // .catch(err => {
//   //   log.logError(err.message);
//   // })


// cursor.forEach(async (e) => console.log(e));
