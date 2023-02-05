import { Request, Response } from 'express';

export default interface Controller {
  exec(req: Request, res: Response): Promise<void>;
}
