import Feed from "../../core/domain/feed";
import FeedExtractorRepository from "../infrastructure/extractor.repository";

export default class ReadExtractorUc {
  constructor (private readonly repo: FeedExtractorRepository) { }

  async extract(): Promise<Feed[]> {
    return this.repo.exec();
  }
}
