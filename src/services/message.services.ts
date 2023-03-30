import { Types } from "mongoose";
import { ChatRoomModel } from "../models/room.model";
import { Message, MessageModel } from "../models/message.model";
import { UserModel } from "../models/user.model";

export class MessageService {
   async saveMessage(
      userId: Types.ObjectId,
      roomId: Types.ObjectId,
      message: string | undefined,
      imagePath: string | undefined
   ): Promise<Message> {
      const room = await ChatRoomModel.findById(roomId);
      if (!room) {
         throw new Error("Room not found");
      }

      if (!room.participants.includes(userId)) {
         throw new Error("User is not a participant in this room");
      }

      if (message === undefined && imagePath === undefined) {
         throw new Error("Message text or image is required");
      }

      const author = await UserModel.findById(userId);
      if (!author) {
         throw new Error("Author not found");
      }

      const newMessage = await MessageModel.create({
         message,
         image: imagePath,
         author: { userName: author.username, id: author._id }
      });

      room.messages.push(newMessage);

      await room.save();
      await newMessage.save();
      return newMessage;
   }
}

export const messageService = new MessageService();