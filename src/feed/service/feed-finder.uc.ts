import Feed from "../domain/feed";
import FeedRepository from "../domain/feed-repository";

export default class FeedFindAllUc {
  constructor(private readonly repo: FeedRepository) { }

  async find(): Promise<Partial<Feed[]>> {
    return await this.repo.findAll();
  }
}
