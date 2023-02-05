import { Id } from "../../core/domain/model";
import Feed from "../../core/domain/feed";
import FeedRepository from "../domain/feed-repository";

export default class FeedCreatorUc {
  constructor(private readonly repo: FeedRepository) { }

  async createFeed(dto: Partial<Feed>): Promise<Id> {
    // await because of nodebestpractices.
    return await this.repo.create(dto);
  }
}
