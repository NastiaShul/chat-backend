import { Server, Socket } from "socket.io";
import { ChatRoomModel } from "../models/room.model";

export class SocketService {
   io: Server;

   constructor(server: any) {
      this.io = new Server(server);

      this.io.on("connection", async (socket: Socket) => {
         // Join the user to the room
         socket.on("joinRoom", async ({ roomId, userId }) => {
            try {
               const room = await ChatRoomModel.findById(roomId);
               if (!room) {
                  throw new Error("Room not found");
               }
               if (!room.participants.includes(userId)) {
                  room.participants.push(userId);
                  await room.save();
               }
               socket.join(roomId);
            } catch (error) {
               console.log(error.message);
            }
         });

         // Handle incoming messages
         socket.on("message", (data) => {
            this.io.to(data.roomId).emit("message", data);
         });

         // Handle disconnection
         socket.on("disconnect", () => {
            console.log("Socket disconnected");
         });
      });
   }
}
