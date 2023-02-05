import { Router, Request, Response, NextFunction } from 'express';
import { Db } from 'mongodb';
import MongoFeedRepository from '../../feed/infrastructure/mongo-feed.repository';
import FeedCreatorUc from '../../feed/service/feed-creator.uc';
import PostFeedController from '../controllers/post-feed.controller';


// TODO - passing di container as param.
const feedRouter = function(db: Db) {
  const router = Router();
  // --->>> to di
  const repo = new MongoFeedRepository(db);
  const uc = new FeedCreatorUc(repo);
  const postFeedController = new PostFeedController(uc);
  // <<<---

  router.post(
    '/api/v1/feed',
    async (req: Request, res: Response, next: NextFunction) => postFeedController.exec(req, res, next)
  );

  return router;
};

export default feedRouter;
