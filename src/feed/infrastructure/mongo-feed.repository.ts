import { Db } from 'mongodb';
import { Id } from '../../core/domain/model';
import Feed from "../domain/feed";
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

  async create(dto: Partial<Feed>):  Promise<Id> {
    const col = await this.mongoCollection();
    // If not driver modifies object passed and tests will fail.
    const { insertedId } = await col.insertOne({ ...dto });

    return { id: insertedId.toString() };
  }
}
