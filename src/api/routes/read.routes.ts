import { Router, Request, Response, NextFunction } from 'express';
import PostRepository from '../../read/infrastructure/post.repository';
import factory from '../../read/infrastructure/strategy-factory';
import ExtractReadController from '../controllers/extract-read.controller';
import PostReadController from '../controllers/post-read.controller';

// TODO - passing di container as param.
const readRouter = function() {
  const router = Router();
  // --->>> to di
  const controller = new ExtractReadController(factory);
  const postController = new PostReadController(new PostRepository(), factory);
  // <<<---

  router.get(
    '/api/v1/read/:newspaper',
    async (req: Request, res: Response, next: NextFunction) => controller.exec(req, res, next)
  );
  router.post(
    '/api/v1/read/:newspaper',
    async (req: Request, res: Response, next: NextFunction) => postController.exec(req, res, next)
  );

  return router;
};

export default readRouter;
