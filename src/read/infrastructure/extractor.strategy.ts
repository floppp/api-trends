import Feed from '../../core/domain/feed';

export abstract class FeedExtractStrategy {
  constructor(public readonly url: string) { }

  abstract run(html: string): Promise<Feed[]>;
}
