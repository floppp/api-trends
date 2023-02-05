import { NextFunction, Request, Response, Router } from 'express';
import { Db } from 'mongodb';
import MongoFeedRepository from '../../feed/infrastructure/mongo-feed.repository';
import FeedCreatorUc from '../../feed/service/feed-creator.uc';
import FeedFindAllUc from '../../feed/service/feed-finder.uc';
import GetFeedController from '../controllers/get-feed.controller';
import PostFeedController from '../controllers/post-feed.controller';


// TODO - passing di container as param.
const feedRouter = function(db: Db) {
  const router = Router();
  // --->>> to di
  const repo = new MongoFeedRepository(db);
  const ucPost = new FeedCreatorUc(repo);
  const ucGet = new FeedFindAllUc(repo);
  const postFeedController = new PostFeedController(ucPost);
  const getFeedController = new GetFeedController(ucGet);
  // <<<---

  router.get(
    '/api/v1/feed',
    async (req: Request, res: Response, next: NextFunction) => getFeedController.exec(req, res, next)
  );
  router.post(
    '/api/v1/feed',
    async (req: Request, res: Response, next: NextFunction) => postFeedController.exec(req, res, next)
  );

  return router;
};

export default feedRouter;
