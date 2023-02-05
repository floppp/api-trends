import { NextFunction, Request, Response } from 'express';
import Controller from '../../core/controller';
import Newspaper, { isNewspaper, newspapers } from '../../read/domain/newspapers';
import ReadException from '../../read/domain/read.exception';
import FeedExtractorRepository from '../../read/infrastructure/extractor.repository';
import { FeedExtractStrategy } from '../../read/infrastructure/extractor.strategy';
import ReadExtractorUc from '../../read/service/read-extractor.uc';

export default class ExtractReadController implements Controller {
  constructor(private readonly factory: (np: Newspaper) => FeedExtractStrategy,
              private readonly nLimit: number = 5) { }

  async exec(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const param = req.params.newspaper;

      if (!isNewspaper(param)) {
        throw new ReadException(`Wrong param, must be on of ${newspapers}`);
      }

      // This could be changed so we decided which strategy to use in the repository
      // itself, and the dependency pipeline would be the same in this read service
      // than in the feed one.
      const strategy = this.factory(param);
      const repo = new FeedExtractorRepository(strategy);
      const uc = new ReadExtractorUc(repo);
      const feeds = (await uc.extract()).filter(f => f.header).slice(0, this.nLimit);

      res.status(200).send({ data: feeds });
    } catch (err) {
      next(err);
    }
  }
}
