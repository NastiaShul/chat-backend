import { Types } from "mongoose";
import { ChatRoomModel } from "../models/room.model";
import { Message, MessageModel } from "../models/message.model";
import { UserModel } from "../models/user.model";

export class MessageService {
	async saveMessage(
		userId: Types.ObjectId,
		roomId: Types.ObjectId,
		message: string | undefined,
		filePath: string | undefined
	): Promise<Message> {
		const room = await ChatRoomModel.findById(roomId);
		if (!room) {
			throw new Error("Room not found");
		}

		if (!room.participants.includes(userId)) {
			throw new Error("User is not a participant in this room");
		}

		if (message === undefined && filePath === undefined) {
			throw new Error("Message text or file is required");
		}

		const author = await UserModel.findById(userId);
		if (!author) {
			throw new Error("Author not found");
		}

		const newMessage = await MessageModel.create({
			message,
			author: { id: author._id, username: author.username },
			filePath,
			room: roomId
		});

		room.messages.push(newMessage);

		await room.save();
		await newMessage.save();
		return newMessage;
	}

	async deleteMessage(messageId: Types.ObjectId, roomId: Types.ObjectId, userId: Types.ObjectId): Promise<void> {
		const room = await ChatRoomModel.findById(roomId);
		if (!room) {
			throw new Error("Room not found");
		}

		const message = await MessageModel.findById(messageId);
		if (!message) {
			throw new Error("Message not found");
		}

		if (message.author.id.toString() !== userId.toString()) {
			throw new Error("Only the author of the message can delete it");
		}

		await message.remove();

		const index = room.messages.findIndex(msg => msg.id.toString() === messageId.toString());
		if (index >= 0) {
			room.messages.splice(index, 1);
		}
		await room.save();
	}
}

export const messageService = new MessageService();
