import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { BaseController } from "../common/abstract/base.controller";
import { AuthenticatedRequest } from "../common/types-and-interfaces";
import { chatRoomSchema, chatRoomUpdateSchema } from "../common/validation/room.validation";
import { roomService } from "../services/room.services";

export class RoomController extends BaseController {
   constructor() {
      super();
      this.bindRoutes([
         {
            path: "/",
            method: "post",
            authRequired: true,
            extractUserId: true,
            validators: {
               body: chatRoomSchema
            },
            handler: this.createRoom
         },
         {
            path: "/:roomId",
            method: "delete",
            handler: this.deleteRoom,
            authRequired: true,
            extractUserId: true,
         },
         {
            path: "/:roomId",
            method: "patch",
            handler: this.updateRoom,
            authRequired: true,
            extractUserId: true,
            validators: {
               body: chatRoomUpdateSchema
            }
         },
         {
            path: "/own",
            method: "get",
            authRequired: true,
            extractUserId: true,
            handler: this.getOwnRooms
         },
         {
            path: "/",
            method: "get",
            authRequired: true,
            extractUserId: true,
            handler: this.getOtherRooms
         },
         {
            path: "/:roomId",
            method: "get",
            handler: this.getRoomMessages
         }
      ])
   }

   createRoom = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const { name, description } = req.body;
      const { userId } = req;
      const room = await roomService.createRoom(name, description, new Types.ObjectId(userId));
      res.send(room);
   }

   deleteRoom = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const { roomId } = req.params;
      const { userId } = req;
      await roomService.deleteRoom(new Types.ObjectId(roomId), new Types.ObjectId(userId));
      res.send("Room successfully deleted");
   }

   updateRoom = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const { roomId } = req.params;
      const { userId } = req;
      await roomService.updateRoom(new Types.ObjectId(roomId), new Types.ObjectId(userId), req.body);
      res.send("Room successfully updated");
   }

   getOwnRooms = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const { userId } = req;
      const response = await roomService.getOwnRooms(new Types.ObjectId(userId));
      res.send(response);
   }

   getOtherRooms = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const { userId } = req;
      const response = await roomService.getOtherRooms(new Types.ObjectId(userId));
      res.send(response);
   }

   getRoomMessages = async (req: Request, res: Response, next: NextFunction) => {
      const { roomId } = req.params;
      const response = await roomService.getRoomMessages(new Types.ObjectId(roomId));
      res.send(response);
   }
}

export const roomController = new RoomController;