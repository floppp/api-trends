import { Id } from "../../core/domain/model";
import FeedExtractorRepository from "../infrastructure/extractor.repository";
import PostRepository from "../infrastructure/post.repository";

export default class ReadStoreUc {
  constructor (private readonly repo: FeedExtractorRepository,
               private readonly postRepo: PostRepository) { }

  async extract(nLimit: number): Promise<Id[]> {
    const feeds = await this.repo.exec();
    const ids = await this.postRepo.exec(feeds.filter(f => f.header).slice(0, nLimit));

    return ids;
  }
}
