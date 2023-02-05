import { Request, Response } from 'express';
import { Id } from './domain/model';

export default interface Controller {
  exec(req: Request, res: Response): Promise<Id>;
}
