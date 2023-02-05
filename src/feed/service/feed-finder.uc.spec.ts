import FeedRepository from '../domain/feed-repository';
import FeedFindAllUc from './feed-finder.uc';

describe('FeedFinderUc', () => {
  const repo = {
    collection: '',
    findAll: jest.fn(),
  } as unknown as FeedRepository;

  it('repo is called when uc is execute', async () => {
    const sut = new FeedFindAllUc(repo);
    await sut.find();
    expect(repo.findAll).toHaveBeenCalled();
  });
});
