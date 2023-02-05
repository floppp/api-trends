import { Request, Response, NextFunction } from 'express';

export default interface Controller {
  exec(req: Request, res: Response, next: NextFunction): Promise<void>;
}
