import { NextFunction, Request, Response } from 'express';
import Controller from '../../core/controller';
import FeedFindAllUc from '../../feed/service/feed-finder.uc';

export default class GetFeedController implements Controller {
  constructor(private readonly uc: FeedFindAllUc) { }

  async exec(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const feeds = await this.uc.find();
      res.status(200).send({ data: feeds });
    } catch (err) {
      next(err);
    }
  }
}
