import { Request, Response, NextFunction } from 'express';
import * as fc from 'fast-check';
import Feed from '../../feed/domain/feed';
import FeedRepository from '../../feed/domain/feed-repository';
import FeedCreatorUc from '../../feed/service/feed-creator.uc';
import PostFeedController from './post-feed.controller';

describe('PostFeedController', () => {
  const uc = {
    repo: {} as FeedRepository,
    createFeed: jest.fn()
  } as unknown as FeedCreatorUc;

  describe('ACL', () => {
    it('should reject a request with empty body', async () => {
      const sut = new PostFeedController(uc);
      try {
        await sut.exec({ body: {} } as Request, {} as Response, jest.fn());
      } catch (e: any) {
        expect(e.message).toContain('Body request has wrong attributes');
      }
    });

    it('should reject a request with wrong types', async () => {
      const sut = new PostFeedController(uc);

      try {
        await sut.exec({ body: { header: 1, date: new Date().toISOString(), subHeader: '' } } as Request, {} as Response, jest.fn());
      } catch (e: any) {
        expect(e.message).toContain('Body request has wrong attributes');
      }

      sut.exec({ body: { header: 1, date: new Date().toISOString(), subHeader: '' } } as Request, {} as Response, jest.fn())
        .catch ((e: Error) => {
          expect(e.message).toContain('Body request has wrong attributes');
        });

      sut.exec({ body: { header: '', date: new Date().toISOString(), subHeader: true } } as Request, {} as Response, jest.fn())
        .catch ((e: Error) => {
          expect(e.message).toContain('Body request has wrong attributes');
        });
    })
  });

  it('if body is ok, service should be called', async () => {
    const sut = new PostFeedController(uc);

    fc.sample(
      fc.record({
        header: fc.string(),
        date: fc.date(),
        subHeader: fc.string()
      }),
      10
    ).map(async (dto: Partial<Feed>) => {
      const req = { body: { ...dto, date: dto.date?.toISOString() } }

      await sut.exec(req as Request, {} as Response, jest.fn());

      expect(uc.createFeed).toHaveBeenCalled();
    });
  });
});
