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

   public async sendMessageToRoom(client: Socket, userId: string, { room, message }: { room: string, message: string }) {
      await messageService.saveMessage(new Types.ObjectId(userId), new Types.ObjectId(room), message);
      client.to(room).emit('new-message', { message, author: userId })
   }
};

export const roomWsController = new RoomWsController();