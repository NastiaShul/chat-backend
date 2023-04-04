import { Request, Response, RequestHandler } from 'express';

const downloadHandler: RequestHandler = (req: Request, res: Response) => {
   const fileName = req.query.fileName;
   if (!fileName) {
      return res.status(400);
   }
   const filePath = `${__dirname}../../../../public/files/${fileName}`;
   res.download(filePath); // Set disposition and send it.
};

export default downloadHandler;
