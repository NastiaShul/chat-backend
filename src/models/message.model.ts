import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { Types } from "mongoose";

@modelOptions({ schemaOptions: { versionKey: false, timestamps: true } })

export class Message {
   @prop({ id: true })
   id!: Types.ObjectId;

   @prop({ required: true })
   message!: string;

   @prop()
   image?: string;

   @prop({ required: true, default: Date.now })
   createdAt!: Date;

   @prop({ required: true })
   author!: Types.ObjectId;
}

export const MessageModel = getModelForClass(Message);
