import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Message } from "./message.model";

@modelOptions({ schemaOptions: { versionKey: false } })

export class ChatRoom {
   @prop({ id: true })
   id!: Types.ObjectId;

   @prop({ required: true })
   owner!: Types.ObjectId;

   @prop({ required: true })
   name!: string;

   @prop({ default: "" })
   description?: string;

   @prop({ default: [] })
   participants!: Types.ObjectId[];

   @prop({ default: [] })
   messages!: Message[];
}

export const ChatRoomModel = getModelForClass(ChatRoom);