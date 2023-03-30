import { Types } from "mongoose";
import { ChatRoomModel } from "../models/room.model";
import { Message, MessageModel } from "../models/message.model";
import { UserModel } from "../models/user.model";
import { StatusCodes } from "http-status-codes";
import { HttpError } from "../commons/errors/http.error";

export class MessageService {
   async saveMessage(
      userId: Types.ObjectId,
      roomId: Types.ObjectId,
      message: string | undefined,
      imagePath: string | undefined
   ): Promise<Message> {
      const room = await ChatRoomModel.findById(roomId);
      if (!room) {
         throw new HttpError(StatusCodes.NOT_FOUND, "User with this email not register in system", "messageServices");
      }

      if (!room.participants.includes(userId)) {
         throw new HttpError(StatusCodes.CONFLICT, "User is not a participant in this room", "messageServices");
      }

      if (message === undefined && imagePath === undefined) {
         throw new HttpError(StatusCodes.NOT_FOUND, "Message text or image is required", "messageServices");
      }

      const author = await UserModel.findById(userId);
      if (!author) {
         throw new HttpError(StatusCodes.NOT_FOUND, "Author not found", "messageServices");
      }

      const newMessage = await MessageModel.create({
         message,
         image: imagePath,
         author: author._id,
      });

      room.messages.push(newMessage);

      await room.save();
      await newMessage.save();
      return newMessage;
   }
}

export const messageService = new MessageService();