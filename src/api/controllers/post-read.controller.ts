import { NextFunction, Request, Response } from 'express';
import Controller from '../../core/controller';
import Newspaper, { isNewspaper, newspapers } from '../../read/domain/newspapers';
import ReadException from '../../read/domain/read.exception';
import FeedExtractorRepository from '../../read/infrastructure/extractor.repository';
import { FeedExtractStrategy } from '../../read/infrastructure/extractor.strategy';
import PostRepository from '../../read/infrastructure/post.repository';
import ReadStoreUc from '../../read/service/read-store.uc';


export default class PostReadController implements Controller {
  constructor(private readonly postRepo: PostRepository,
              private readonly factory: (np: Newspaper) => FeedExtractStrategy,
              private readonly nLimit: number = 5) { }

  async exec(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const param = req.params.newspaper;

      if (!isNewspaper(param)) {
        throw new ReadException(`Wrong param, must be on of ${newspapers}`);
      }

      const strategy = this.factory(param);
      const uc = new ReadStoreUc(
        new FeedExtractorRepository(strategy),
        this.postRepo
      );
      const ids = await uc.extract(this.nLimit);

      res.status(200).send({ data: ids });
    } catch (err) {
      next(err);
    }
  }
}
