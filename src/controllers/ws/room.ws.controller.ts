import { UserModel } from './../../models/user.model';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { Socket } from "socket.io";
import { Types } from "mongoose";
import { roomService } from "../../services/room.services";
import { messageService } from "../../services/message.services";

export class RoomWsController {
   constructor() { }

   public async joinRooms(client: Socket, userId: string, { rooms }: { rooms: string[] }) {
      // save to model
      await Promise.all(rooms.map(async (room) => {
         const roomId = new Types.ObjectId(room);
         await roomService.joinRoom(new Types.ObjectId(userId), roomId);
         await client.join(room);
      }));
      const user = await UserModel.findById(userId);
      //user-joined -> sends to FE. FE should have smth like socket.on("user-joined")
      client.to(rooms).emit('user-joined', { message: `${user?.username} joined room` });
   };

   public async leaveRooms(client: Socket, userId: string, { rooms }: { rooms: string[] }) {
      await Promise.all(rooms.map(async (room) => {
         const roomId = new Types.ObjectId(room);
         await roomService.leaveRoom(new Types.ObjectId(userId), roomId);
         await client.leave(room);
      }));
      await Promise.all(rooms.map((room) => client.leave(room)))
      const user = await UserModel.findById(userId);
      client.to(rooms).emit('user-left', { message: `${user?.username} left room` })
   };

   public async sendMessageToRoom(client: Socket, userId: string, { room, message, image }: { room: string, message: string, image?: Buffer }) {
      let imagePath;
      if (image) {
         const fileName = `${Date.now()}.png`;
         const filePath = join(__dirname, '../../public', 'images', fileName);
         writeFileSync(filePath, Buffer.from(image));
         imagePath = filePath;
      }

      const user = await UserModel.findById(userId);

      await messageService.saveMessage(new Types.ObjectId(userId), new Types.ObjectId(room), message, imagePath);

      if (image) {
         client.to(room).emit('new-message', { message: { message: message, image }, author: user?.username });
      } else {
         client.to(room).emit('new-message', { message: { message: message }, author: user?.username });
      }
   }
};

export const roomWsController = new RoomWsController();