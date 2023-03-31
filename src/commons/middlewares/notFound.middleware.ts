import { Request, Response } from 'express';

const notFoundMiddleware = (req: Request, res: Response): void => {
  res.status(404).send('Not Found');
};
export default notFoundMiddleware;
