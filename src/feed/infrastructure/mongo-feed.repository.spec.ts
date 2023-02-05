import * as dotenv from 'dotenv';
dotenv.config();
import * as fc from 'fast-check';
import { MongoClient } from 'mongodb';
import { initMongoDB, mongoClients } from '../../core/infrastructure/mongo-connection';
import MongoFeedRepository from './mongo-feed.repository';

describe('MongoFeedRepository', () => {
  const dbName = 'api-feed_test';
  let client!: MongoClient;
  let db!: any;
  let col!: any;

  beforeAll(async () => {
    initMongoDB(dbName, process.env.MONGO_URI ?? '');
    client = mongoClients[dbName];
    db = client.db(dbName);
    col = db.collection('feed');
    await col.deleteMany({});
  });

  it('if a document is inserted must be retrieved with same id', async () => {
    fc.assert(
      fc.property(
        fc.record({
          header: fc.integer(),
          date: fc.date(),
          subHeader: fc.string()
        }),
        (dto: any) => {
          col.insertOne(dto)
            .then((_id: any) => {
              col.findOne({ _id })
                .then((feed: any) => {
                  expect(feed).toEqual(dto);
                })
            })
        }
      ));

  });

  it('create stores a new feed in database', async () => {
    const sut = new MongoFeedRepository();
    const col = await db.collection(sut.colName);
    const feeds = col.find({});
    await feeds.forEach(console.log)
    // wait client.db(dbName).command({ ping: 1 });
    // console.log("Connected successfully to server");
  });

  afterAll(async () => {
    await client.close();
  })
});
