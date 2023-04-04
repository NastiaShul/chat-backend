import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { Types } from "mongoose";

@modelOptions({ schemaOptions: { versionKey: false, timestamps: true } })

export class Message {
	@prop({ id: true })
	id!: Types.ObjectId;

	@prop({ required: true })
	message!: string;

	@prop({ required: true, default: Date.now })
	createdAt!: Date;

	@prop({ required: true })
	author!: {
		id: Types.ObjectId,
		username: string
	};

	@prop({ required: true })
	room!: Types.ObjectId;

	@prop()
	filePath?: string;
}

export const MessageModel = getModelForClass(Message);
