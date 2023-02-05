import axios from 'axios';
import cheerio from 'cheerio';
import Feed from '../../core/domain/feed';
import { FeedExtractStrategy } from './extractor.strategy';

// This could be implemented as a Template pattern if
// more complexity must be added.
export default class FeedExtractorRepository {
  constructor(private readonly strategy: FeedExtractStrategy) { }

  async exec(): Promise<Feed[]> {
    const webResponse = await axios.get(this.strategy.url);

    return this.strategy.run(webResponse.data);
  }
}
