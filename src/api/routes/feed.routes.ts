import { Router } from 'express';
import PostFeedController from '../controllers/post-feed.controller';


// TODO - passing di container as param.
const feedRouter = () => {
  const router = Router();
  const postFeedController = new PostFeedController();

  router.post('/api/v1/feed', postFeedController.exec);

  return router;
};

export default feedRouter;
