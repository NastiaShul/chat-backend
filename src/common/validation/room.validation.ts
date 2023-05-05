import Joi from "joi";

export const chatRoomSchema = Joi.object({
   name: Joi.string().pattern(new RegExp("[a-zA-Z0-9!@#$%^&*]+$")).min(2).max(30).required(),

   description: Joi.string().allow("").pattern(new RegExp("[a-zA-Z0-9!@#$%^&*]+$")).min(0).max(255),

   participants: Joi.array(),

   messages: Joi.array()
});

export const chatRoomUpdateSchema = Joi.object({
   name: Joi.string().pattern(new RegExp("[a-zA-Z0-9!@#$%^&*]+$")).min(2).max(30),

   description: Joi.string().allow("").pattern(new RegExp("[a-zA-Z0-9!@#$%^&*]+$")).min(0).max(255),
});