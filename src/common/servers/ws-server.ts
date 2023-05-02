import { Server, Socket } from "socket.io";
import { Logger } from "tslog";
import { JwtTokenPayload, WsHandler } from "../types-and-interfaces";
import jwt, { JwtPayload } from 'jsonwebtoken';

export class WsServer {
   protected readonly handlers!: Map<string, WsHandler>;
   readonly logger = new Logger();

   constructor(protected readonly server: Server) {
      this.handlers = new Map();
      this.server.on('connection', async (socket) => {

         const token = socket.handshake.headers.authorization?.split(' ')[1];
         
         try {
            const { userId } = this.verifyAuth(token as string);
            this.logger.info(`Client ${userId} connected`)
            for (const [action, handler] of this.handlers.entries()) {
               socket.on(action, this.wrapHandler(socket, userId, handler))
            }
            socket.on("disconnect", () => {
               this.logger.info(`Client ${userId} was disconnected`)
            });
         } catch (e) {
            this.logger.error(e);
            socket.disconnect(true);
         }
      })
   }

   onMessage(action: string, handler: WsHandler) {
      this.handlers.set(action, handler);
      return this;
   }

   protected wrapHandler(socket: Socket, userId: string, handler: WsHandler) {
      return async (payload: string) => {
         try {
            payload = JSON.stringify(payload);
            await handler(socket, userId, JSON.parse(payload));
         } catch (e) {
            this.logger.error(e)
         }
      }
   }

   protected verifyAuth(token: string): JwtTokenPayload {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      return { userId };
   }
}
