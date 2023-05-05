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
import { exceptionFilter } from "./common/errors/exception.filter";
import { config } from "./common/config";
import { userController } from "./controllers/user.controller";
import { roomController } from "./controllers/room.controller";
import { roomWsController } from "./controllers/ws/room.ws.controller";
import { swaggerDocument } from "./common/docs";
import { WsServer } from "./common/servers/ws-server";
import { upload } from "./common/utils/fileHelpers";
import uploadHandler from "./common/handlers/upload.handler";
import downloadHandler from "./common/handlers/download.handler";
import notFoundHandler from "./common/handlers/notFound.handler";


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
   this.app.use('/upload', upload.single('file'), uploadHandler)
   // allows to see folder with images by url like /images/imageName.ext
   this.app.use('/files', express.static(join(__dirname, '..', 'public', 'files')));
   // allow to download images by url like /download/images/imageName.ext
   this.app.get('/download', downloadHandler);
   // if img isn't here or another wrong route
   this.app.use(notFoundHandler);
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