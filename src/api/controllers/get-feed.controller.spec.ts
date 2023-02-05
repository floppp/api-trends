import { Request, Response, NextFunction } from 'express';
import * as fc from 'fast-check';
import Feed from '../../core/domain/feed';
import FeedRepository from '../../feed/domain/feed-repository';
import GetFeedController from './get-feed.controller';
import FeedFindAllUc from '../../feed/service/feed-finder.uc';

describe('GetFeedController', () => {
  const uc = {
    repo: {} as FeedRepository,
    find: jest.fn()
  } as unknown as FeedFindAllUc;

  describe('ACL', () => {
    it('should reject a request with empty body', async () => {
      const sut = new GetFeedController(uc);
      try {
        await sut.exec({} as Request, {} as Response, jest.fn());
      } catch (e: any) {
        expect(e.message).toContain('Body request has wrong attributes');
      }
    });

    it('should reject a request with wrong types', async () => {
      const sut = new GetFeedController(uc);
      const feeds = await sut.exec({} as Request, {} as Response, jest.fn());

      expect(uc.find).toHaveBeenCalled();
    })
  });
});
