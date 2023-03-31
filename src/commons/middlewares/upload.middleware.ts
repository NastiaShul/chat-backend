import { Request, Response, RequestHandler } from 'express';

const uploadMiddleware: RequestHandler = (req: Request, res: Response<string>) => {
	if (!req.file) {
		return res.status(400);
	}

	const relativeFilePath = req.file.path
		.replace(/\\/g, '/')
		.replace(/\s/g, "")
		.split('chat/public')[1];

	console.log('relativeFilePath', req.file.path);

	res.status(201).json(relativeFilePath);
};

export default uploadMiddleware;
