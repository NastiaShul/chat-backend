import { NextFunction, Request, Response } from "express";
import { BaseController } from "../commons/abstract/base.controller";
import { userService } from "../services/user.services";
import { userRegisterSchema, userUpdateSchema } from "../commons/validation/user.validation";
import { Types } from "mongoose";
import { AuthenticatedRequest } from "../commons/types-and-interfaces";
import { chatRoomSchema } from "../commons/validation/room.validation";

export class UserController extends BaseController {
   constructor() {
      super();
      this.bindRoutes([
         {
            path: "/register",
            method: "post",
            handler: this.register,
            validators: {
               body: userRegisterSchema
            }
         },
         {
            path: "/login",
            method: "post",
            handler: this.login,
         },
         {
            path: "/",
            method: "get",
            authRequired: true,
            handler: this.getAllUsers,
         },
         {
            path: "/:user",
            method: "patch",
            authRequired: true,
            extractUserId: true,
            validators: {
               body: userUpdateSchema
            },
            handler: this.updateUserProfile,
         },
         {
            path: "/:user",
            method: "delete",
            authRequired: true,
            extractUserId: true,
            handler: this.deleteUserProfile
         },
         {
            path: "/rooms",
            method: "post",
            authRequired: true,
            extractUserId: true,
            validators: {
               body: chatRoomSchema
            },
            handler: this.createRoom
         },
      ])
   }

   register = async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;
      const user = await userService.registration(email, password, req.body);
      res.send(user);
   }

   login = async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;
      const response = await userService.login(email, password);
      res.send(response);
   }

   getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
      const response = await userService.getAllUsers();
      res.send(response);
   }

   updateUserProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const { user } = req.params;
      const { userId } = req;
      const userProfile = await userService.updateUserProfile(new Types.ObjectId(userId), new Types.ObjectId(user), req.body);
      res.send(`User profile successfully updated: ${userProfile}`)
   }

   deleteUserProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const { user } = req.params;
      const { userId } = req;
      await userService.deleteUserProfile(new Types.ObjectId(user), new Types.ObjectId(userId));
      res.send("User profile successfully deleted");
   }

   createRoom = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const { name, description } = req.body;
      const { userId } = req;
      const room = await userService.createRoom(name, description, new Types.ObjectId(userId));
      res.send(room);
   }
}

export const userController = new UserController