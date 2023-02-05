import { Request, Response } from 'express';
import Controller from '../../core/controller';
import { Id } from '../../core/domain/model';
import { validateCreateFeedDto } from '../../feed/domain/create-feed.dto';
import CreateFeedException from '../../feed/domain/create-feed.exception';
import FeedCreatorUc from '../../feed/service/feed-creator.uc';

export default class PostFeedController implements Controller {
  constructor(private readonly uc: FeedCreatorUc) { }

  async exec(req: Request, res: Response): Promise<Id> {
    const body = req.body;

    if (!validateCreateFeedDto(body))
      throw new CreateFeedException('Body request has wrong attributes');

    const { header, subHeader, date } = body;


    return await this.uc.createFeed({ header, subHeader, date: new Date(date) });
  }
}
