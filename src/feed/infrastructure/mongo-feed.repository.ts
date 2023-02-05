import CreateFeedDto from "../domain/create-feed.dto";
import Feed from "../domain/feed";
import FeedRepository from "../domain/feed-repository";

export default class MongoFeedRepository extends FeedRepository {
  get colName() {
    return this.collection;
  }

  async create(dto: Partial<Feed>):  Promise<{ id: string, n: number }> {
    return Promise.resolve({ id: 'id', n: 1 });
  }
}
