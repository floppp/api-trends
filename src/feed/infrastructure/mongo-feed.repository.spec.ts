import * as dotenv from 'dotenv';
dotenv.config();
import * as fc from 'fast-check';
import { ObjectId, MongoClient } from 'mongodb';
import { initMongoDB, mongoClients } from '../../core/infrastructure/mongo-connection';
import Feed from '../domain/feed';
import MongoFeedRepository from './mongo-feed.repository';

describe('MongoFeedRepository', () => {
  const dbName = 'api-feed_test';
  let client!: MongoClient;
  let db!: any;
  let col!: any;
  let repo!: MongoFeedRepository;

  beforeAll(async () => {
    initMongoDB(dbName, process.env.MONGO_URI ?? '');
    client = mongoClients[dbName];
    db = client.db(dbName);
    col = db.collection('feed');
    await col.deleteMany({});
  });

  beforeEach(() => {
    repo = new MongoFeedRepository(db);
  })

  it('create stores a new feed in database', async () => {
    const mock = { header: 'header', subHeader: 'subheader' };
    const { id } = await repo.create(mock);
    const feed = await col.findOne({ _id: new ObjectId(id)});

    expect(mock).toEqual({ header: feed.header, subHeader: feed.subHeader });
  });

  afterAll(async () => {
    await client.close();
  })
});
