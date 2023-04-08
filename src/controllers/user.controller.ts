import { NextFunction, Request, Response } from "express";
import generator from "generate-password";
import { BaseController } from "../common/abstract/base.controller";
import { userService } from "../services/user.services";
import { userRegisterSchema, userUpdateSchema } from "../common/validation/user.validation";
import { Types } from "mongoose";
import { AuthenticatedRequest } from "../common/types-and-interfaces";
import { mailService } from "../services/mail.service";

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
				authRequired: true,
				extractUserId: true,
				handler: this.login,
			},
			{
				path: "/",
				method: "get",
				authRequired: true,
				handler: this.getAllUsers,
			},
			{
				path: "/:userId",
				method: "get",
				handler: this.getUser,
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
				path: "/password-reset",
				method: "post",
				handler: this.sendNewPasswordOnUserEmail,
			},
		])
	}

	register = async (req: Request, res: Response, next: NextFunction) => {
		const { email, password, username } = req.body;
		const user = await userService.registration(username, email, password, req.body);
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

	getUser = async (req: Request, res: Response, next: NextFunction) => {
		const { userId } = req.params;
		const response = await userService.getUser(new Types.ObjectId(userId));
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

	sendNewPasswordOnUserEmail = async (req: Request, res: Response, next: NextFunction) => {
		const { email } = req.body;
		const newPassword = generator.generate({
			length: 8,
			uppercase: true,
			symbols: true,
			numbers: true
		});

		await mailService.sendEmail(email, newPassword)
		await mailService.changePassword(email, newPassword)

		res.send("New password sent to email account")
	}
}

export const userController = new UserController