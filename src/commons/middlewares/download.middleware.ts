import { Request, Response, RequestHandler } from 'express';

const downloadMiddleware: RequestHandler = (req: Request, res: Response) => {
  console.log('downloadMiddleware');
  const fileName = req.query.fileName;
  console.log('fileName', fileName);
  if (!fileName) {
    return res.status(400);
  }

  const filePath = `${__dirname}../../../../public/${fileName}`;

  res.download(filePath); // Set disposition and send it.
};

export default downloadMiddleware;
