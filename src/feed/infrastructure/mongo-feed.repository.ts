import { Db } from 'mongodb';
import { Id } from '../../core/domain/model';
import Feed, { FeedDocument } from "../domain/feed";
import FeedRepository from "../domain/feed-repository";

export default class MongoFeedRepository extends FeedRepository {
  constructor(private readonly db: Db) {
    super();
  }

  get colName() {
    return this.collection;
  }

  async mongoCollection() {
    return this.db.collection(this.collection);
  }

  async findAll(): Promise<Feed[]> {
    const col = await this.mongoCollection();
    const cursor = await col.find<FeedDocument>({});
    const feeds: FeedDocument[] = await cursor.toArray();

    return feeds.map(f => ({
      header: f.header, subHeader: f.subHeader, date: f.date
    }));
  }

  async findOne(criteria: Partial<Feed>): Promise<Feed> {
    throw new Error('Method not implemented.');
  }

  async create(dto: Partial<Feed>):  Promise<Id> {
    const col = await this.mongoCollection();
    // If not driver modifies object passed and tests will fail.
    const { insertedId } = await col.insertOne({ ...dto });

    return { id: insertedId.toString() };
  }
}
