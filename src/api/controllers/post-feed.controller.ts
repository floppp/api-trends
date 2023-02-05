import { Request, Response } from 'express';
import Controller from '../../core/controller';

export default class PostFeedController implements Controller {
  exec(req: Request, res: Response): Promise<void> {
    return Promise.resolve();
  }
}
