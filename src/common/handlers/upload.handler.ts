import { Request, Response, RequestHandler } from 'express';

const uploadHandler: RequestHandler = (req: Request, res: Response<string>) => {
   if (!req.file) {
      return res.status(400);
   }
   const relativeFilePath = req.file.path
      .replace(/\\/g, '/')
      .replace(/\s/g, "")
      .split('public')[1];
   res.status(201).json(relativeFilePath);
};

export default uploadHandler;
