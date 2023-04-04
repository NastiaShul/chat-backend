import { StatusCodes } from "http-status-codes";
import { Types } from "mongoose";
import { HttpError } from "../common/errors/http.error";
import { ChatRoom, ChatRoomModel } from "../models/room.model";
import { UserModel } from "../models/user.model";
import { MessageModel } from "../models/message.model";

export class RoomService {

   async createRoom(
      roomName: string,
      description: string,
      userId: Types.ObjectId
   ): Promise<ChatRoom> {
      const user = await UserModel.findById(userId);
      if (!user) {
         throw new HttpError(StatusCodes.NOT_FOUND, "User is not found", "UserController");
      }

      const existingRoom = await ChatRoomModel.findOne({ name: roomName });
      if (existingRoom) {
         throw new HttpError(StatusCodes.CONFLICT, `A room with the name "${roomName}" already exists`, "UserController");
      }

      const newRoom = await ChatRoomModel.create({
         name: roomName,
         description,
         owner: user
      });
      user.rooms.push(newRoom._id);
      await user.save();
      await newRoom.save();

      return newRoom;
   }

   async deleteRoom(
      roomId: Types.ObjectId,
      userId: Types.ObjectId
   ) {
      const user = await UserModel.findById(userId);
      if (!user) {
         throw new HttpError(StatusCodes.NOT_FOUND, "User is not found", "UserController");
      }
      const room = await ChatRoomModel.findById(roomId);
      if (!room) {
         throw new HttpError(StatusCodes.NOT_FOUND, "Room is not found", "UserController");
      }

      if (!user.rooms.includes(roomId)) {
         throw new HttpError(StatusCodes.FORBIDDEN, "User does not own this room", "UserController");
      }

      await ChatRoomModel.findByIdAndDelete(roomId);
      await MessageModel.deleteMany({ room: roomId })
      user.rooms = user.rooms.filter((roomId) => roomId.toString() !== room._id.toString());
      await user.save();
   }

   async updateRoom(
      roomId: Types.ObjectId,
      userId: Types.ObjectId,
      params: object
   ) {
      const user = await UserModel.findById(userId);
      if (!user) {
         throw new HttpError(StatusCodes.NOT_FOUND, "User is not found", "UserController");
      }
      const room = await ChatRoomModel.findById(roomId);
      if (!room) {
         throw new HttpError(StatusCodes.NOT_FOUND, "Room is not found", "UserController");
      }

      if (!user.rooms.includes(roomId)) {
         throw new HttpError(StatusCodes.FORBIDDEN, "User does not own this room", "UserController");
      }

      await ChatRoomModel.findByIdAndUpdate(
         roomId,
         params,
         { new: true }
      );
      const updatedRoom = await room.save();
      return updatedRoom;
   }


   async getOwnRooms(userId: Types.ObjectId): Promise<ChatRoom[]> {
      const user = await UserModel.findById(userId);
      if (!user) {
         throw new HttpError(StatusCodes.NOT_FOUND, "User is not found", "UserController");
      }
      return await ChatRoomModel.find({ owner: user });
   }

   async getOtherRooms(userId: Types.ObjectId): Promise<ChatRoom[]> {
      const user = await UserModel.findById(userId);
      if (!user) {
         throw new HttpError(StatusCodes.NOT_FOUND, "User is not found", "UserController");
      }
      return await ChatRoomModel.find({ owner: { $ne: user } });
   }

   async joinRoom(userId: Types.ObjectId, roomId: Types.ObjectId) {
      const room = await ChatRoomModel.findById(roomId);
      if (!room) {
         throw new HttpError(StatusCodes.NOT_FOUND, "Room is not found", "UserController");
      }

      const user = await UserModel.findById(userId);
      if (!user) {
         throw new HttpError(StatusCodes.NOT_FOUND, "User is not found", "UserController");
      }

      if (room.participants.includes(user._id)) {
         throw new HttpError(StatusCodes.CONFLICT, "User is already a participant in this room", "UserController");
      }

      const userRooms = await ChatRoomModel.find({ participants: user._id });
      for (const userRoom of userRooms) {
         if (userRoom._id.toString() !== roomId.toString()) {
            userRoom.participants = userRoom.participants.filter((id) => id.toString() !== userId.toString());
            await userRoom.save();
         }
      }

      room.participants.push(user._id);
      await room.save();
      return room;
   }

   async leaveRoom(userId: Types.ObjectId, roomId: Types.ObjectId) {
      const room = await ChatRoomModel.findById(roomId);
      if (!room) {
         throw new HttpError(StatusCodes.NOT_FOUND, "Room is not found", "UserController");
      }

      const userIndex = room.participants.indexOf(userId);
      if (userIndex === -1) {
         throw new HttpError(StatusCodes.CONFLICT, "User is not a participant in this room", "UserController");
      }

      room.participants.splice(userIndex, 1);
      await room.save();
      return room;
   }

   async getRoomMessages(roomId: Types.ObjectId) {
      const messages = await MessageModel.find({ room: roomId });
      return messages;
   }
}

export const roomService = new RoomService();