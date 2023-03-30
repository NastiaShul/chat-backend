import { writeFileSync } from 'fs';
import { join } from 'path';
import { Socket } from "socket.io";
import { Types } from "mongoose";
import { roomService } from "../../services/room.services";
import { messageService } from "../../services/message.services";

export class RoomWsController {
   constructor() { }

   public async joinRooms(client: Socket, userId: string, { rooms }: { rooms: string[] }) {
      // TODO: check do rooms exist
      // save to model
      await Promise.all(rooms.map(async (room) => {
         const roomId = new Types.ObjectId(room);
         await roomService.joinRoom(new Types.ObjectId(userId), roomId);
         await client.join(room);
      }));
      //user-joined -> sends to FE. FE should have smth like socket.on("user-joined",
      client.to(rooms).emit('user-joined', { message: 'User joined room' });
   };

   public async leaveRooms(client: Socket, userId: string, { rooms }: { rooms: string[] }) {
      // TODO: check do rooms exist
      await Promise.all(rooms.map(async (room) => {
         const roomId = new Types.ObjectId(room);
         await roomService.leaveRoom(new Types.ObjectId(userId), roomId);
         await client.leave(room);
      }));
      await Promise.all(rooms.map((room) => client.leave(room)))

      client.to(rooms).emit('user-left', { message: 'User left room' })
   };

   public async sendMessageToRoom(client: Socket, userId: string, { room, message, image }: { room: string, message: string, image?: Buffer }) {
      let imagePath;
      if (image) {
         const fileName = `${Date.now()}.png`;
         const filePath = join(__dirname, '../../public', 'images', fileName);
         writeFileSync(filePath, Buffer.from(image));
         imagePath = filePath;
      }

      await messageService.saveMessage(new Types.ObjectId(userId), new Types.ObjectId(room), message, imagePath);

      if (image) {
         client.to(room).emit('new-message', { message: { message: message, image }, author: userId });
      } else {
         client.to(room).emit('new-message', { message: { message: message }, author: userId });
      }
   }
};

export const roomWsController = new RoomWsController();