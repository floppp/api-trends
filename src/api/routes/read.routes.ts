import { NextFunction, Request, Response, Router } from 'express';
import MongoFeedRepository from '../../feed/infrastructure/mongo-feed.repository';
import FeedCreatorUc from '../../feed/service/feed-creator.uc';
import FeedFindAllUc from '../../feed/service/feed-finder.uc';
import GetFeedController from '../controllers/get-feed.controller';
import PostFeedController from '../controllers/post-feed.controller';
import ElPaisExtractStrategy from '../../read/infrastructure/elpais-strategy';
import ElMundoExtractStrategy from '../../read/infrastructure/elmundo-strategy';
import FeedExtractorRepository from '../../read/infrastructure/extractor.repository';
import Feed from '../../core/domain/feed';


// Initialization could be done using a FactoryMethod:
// factory(np: 'elmundo' | 'elpais'): FeedExtractStrategy {
//   let strategy;
//   switch(np) {
//   ....
//   }
//   return strategey;
// }

// TODO - passing di container as param.
const readRouter = function() {
  const router = Router();
  // --->>> to di
  const epStrategy = new ElPaisExtractStrategy();
  const emStrategy = new ElMundoExtractStrategy();
  const epExtractor = new FeedExtractorRepository(epStrategy);
  const emExtractor = new FeedExtractorRepository(emStrategy);

  // const repo = new MongoFeedRepository(db);
  // const ucPost = new FeedCreatorUc(repo);
  // const ucGet = new FeedFindAllUc(repo);
  // const postFeedController = new PostFeedController(ucPost);
  // const getFeedController = new GetFeedController(ucGet);
  // <<<---

  // salida get -> leo sin más
  // router.get(
  //   '/api/v1/read',
  //   async (req: Request, res: Response, next: NextFunction) => getFeedController.exec(req, res, next)
  // );
  // salida post -> posteo en feed
  // router.post(
  //   '/api/v1/read',
  //   async (req: Request, res: Response, next: NextFunction) => postFeedController.exec(req, res, next)
  // );

  return router;
};

export default readRouter;
