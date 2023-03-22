import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { Types } from "mongoose";

@modelOptions({ schemaOptions: { versionKey: false } })

export class ChatRoom {
   @prop({ id: true })
   id!: Types.ObjectId;

   @prop({ required: true })
   owner!: Types.ObjectId;

   @prop({ required: true })
   name!: string;

   @prop()
   description?: string;

   @prop({ default: [] })
   participants!: Types.ObjectId[];

   @prop({default: []})
   messages!: Types.ObjectId[];
}

export const ChatRoomModel = getModelForClass(ChatRoom);
