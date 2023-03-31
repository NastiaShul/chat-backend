import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { Types } from "mongoose";

@modelOptions({ schemaOptions: { versionKey: false, timestamps: true } })

export class File {
   @prop({ id: true })
   id!: Types.ObjectId;

   @prop({ required: true })
   filename!: string;

   @prop()
   path!: string;

   @prop()
   size!: number;

   @prop({ required: true, default: Date.now })
   createdAt!: Date;
}

export const FileModel = getModelForClass(File);
