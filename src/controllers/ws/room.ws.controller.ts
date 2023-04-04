import { Socket } from "socket.io";
import { Types } from "mongoose";
import { roomService } from "../../services/room.services";
import { messageService } from "../../services/message.services";
import { UserModel } from "../../models/user.model";

export class RoomWsController {
   constructor() { }

   public async joinRooms(client: Socket, userId: string, { rooms }: { rooms: string[] }) {
      // save to model
      const user = await UserModel.findById(userId);
      await Promise.all(rooms.map(async (room) => {
         const roomId = new Types.ObjectId(room);
         await roomService.joinRoom(new Types.ObjectId(userId), roomId);
         await client.join(room);
      }));

      //user-joined -> sends to FE. FE should have smth like socket.on("user-joined",
      client.to(rooms).emit('user-joined', { message: `${user!.username} joined room` });
   };

   public async leaveRooms(client: Socket, userId: string, { rooms }: { rooms: string[] }) {
      const user = await UserModel.findById(userId);
      console.log(userId);

      await Promise.all(rooms.map(async (room) => {
         const roomId = new Types.ObjectId(room);
         await roomService.leaveRoom(new Types.ObjectId(userId), roomId);
         await client.leave(room);
      }));
      await Promise.all(rooms.map((room) => client.leave(room)))
      client.to(rooms).emit('user-left', { message: `${user!.username} leave room` })
   };

   public async sendMessageToRoom(client: Socket, userId: string, { room, message, filePath }: { room: string, message: string, filePath?: string }) {
      const user = await UserModel.findById(userId);
      await messageService.saveMessage(new Types.ObjectId(userId), new Types.ObjectId(room), message, filePath);

      if (filePath) {
         client.to(room).emit('new-message', { message: { message: message, filePath }, author: { username: user?.username }, createdAt: new Date() });
      } else {
         client.to(room).emit('new-message', { message: { message: message }, author: { username: user?.username }, createdAt: new Date() });
      }
   }
};

export const roomWsController = new RoomWsController();
