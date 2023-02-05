import * as dotenv from 'dotenv';
dotenv.config();
import * as fc from 'fast-check';
import Feed from '../domain/feed';
import FeedRepository from '../domain/feed-repository';
import FeedCreatorUc from './feed-creator.uc';

describe('FeedCreatorUc', () => {
  const repo = {
    collection: '',
    create: jest.fn()
  } as unknown as FeedRepository;

  it('repo is called when uc is execute', async () => {
    const sut = new FeedCreatorUc(repo);
    await sut.createFeed({ header: '', subHeader: '', date: new Date() });
    expect(repo.create).toHaveBeenCalled();
  });
});
