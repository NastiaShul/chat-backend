import express from "express";
import http from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import bodyparser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import { join } from "path";
import { exceptionFilter } from "./commons/errors/exception.filter";
import { config } from "./commons/config";
import { userController } from "./controllers/user.controller";
import { roomController } from "./controllers/room.controller";
import { roomWsController } from "./controllers/ws/room.ws.controller";
import { swaggerDocument } from "./commons/docs";
import { WsServer } from "./commons/servers/ws-server";
import uploadMiddleware from "./commons/middlewares/upload.middleware";
import downloadMiddleware from "./commons/middlewares/download.middleware";
import notFoundMiddleware from "./commons/middlewares/notFound.middleware";
import { upload } from "./utils/fileHelpers";


export class App {
	app = express();
	server = http.createServer(this.app);
	wsServer = new WsServer(new Server(this.server, {
		cors: {
			origin: "*",
			methods: "GET,PUT,POST,DELETE,PATCH"
		}
	}));

	PORT = config.app.port;

	useRoutes() {
		this.app.use("/users", userController.router);
		this.app.use("/rooms", roomController.router);
		this.app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
		this.app.use('/upload', upload.single('file'), uploadMiddleware)
		// allows to see folder with images by url like /images/imageName.ext
		this.app.use('/images', express.static(join(__dirname, '..', 'public', 'images')));
		// allow to download images by url like /download/images/imageName.ext
		this.app.get('/download', downloadMiddleware);
		// if img isn't here or another wrong route
		this.app.use(notFoundMiddleware);
	}

	useMiddlewares() {
		// to get img in html that works on different port for testing reasons
		this.app.use(helmet({ crossOriginResourcePolicy: false }));
		this.app.use(cors());
		this.app.use(
			morgan(':date[iso] ":method :url" :status :res[content-length]')
		);
		this.app.use(bodyparser.urlencoded({ extended: true }));
		this.app.use(bodyparser.json());
	};

	async initDb() {
		mongoose.set('strictQuery', false);
		await mongoose.connect(process.env.DB_LINK!);
		console.log("MongoDB connection established successfully");
	};

	async initWs() {
		this.wsServer.onMessage('join-rooms', roomWsController.joinRooms);
		this.wsServer.onMessage('leave-rooms', roomWsController.leaveRooms);
		this.wsServer.onMessage('send-message', roomWsController.sendMessageToRoom);
	}

	async init() {
		this.useMiddlewares();
		this.useRoutes();
		await this.initDb();

		this.initWs()

		this.app.use(exceptionFilter.catch.bind(exceptionFilter));

		this.server.listen(this.PORT, () => {
			console.log(`Server listening on port ${this.PORT}`);
		});

		process.on("uncaughtException", (err: Error) => {
			console.log("Uncaught error", err.message);
		});

		process.on("unhandledRejection", (err: Error) => {
			console.log("Uncaught ASYNC error", err.message);
		});
	}
}

(async () => {
	const app = new App();
	await app.init();
})();