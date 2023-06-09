import { StatusCodes } from 'http-status-codes';
import { Types } from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { HttpError } from '../common/errors/http.error';
import { UserModel, User } from './../models/user.model';
import { JwtTokenPayload, UpdateUserParams } from '../common/types-and-interfaces';
import { ChatRoomModel, ChatRoom } from '../models/room.model';


export class UserService {
   generateToken(tokenPayload: JwtTokenPayload) {
      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!);
      return token;
   }

   checkOwnership(user: Types.ObjectId, reqUserId: Types.ObjectId) {
      if (user._id.toString() !== reqUserId.toString()) {
         throw new HttpError(StatusCodes.FORBIDDEN, "User does not own this profile", "UserController");
      }
      return true;
   }

   async registration(
      username: string,
      email: string,
      password: string,
      params: object
   ): Promise<{ user: User, token: string }> {
      const checkUserEmail: User | null = await UserModel.findOne({ email });
      const checkUserName: User | null = await UserModel.findOne({
         username
      });
      if (checkUserEmail || checkUserName) {
         throw new HttpError(StatusCodes.CONFLICT, "User already exist", "UserController");
      }
      const hashPassword = await bcrypt.hash(password, 7);
      const user = await UserModel.create({ _id: new Types.ObjectId(), ...params, password: hashPassword });
      const tokenPayload: JwtTokenPayload = { userId: user._id.toString() };
      const token = this.generateToken(tokenPayload);
      return { user, token };
   }

   async login(
      email: string,
      password: string,
   ) {
      const user: User | null = await UserModel.findOne({ email });
      if (!user) {
         throw new HttpError(StatusCodes.NOT_FOUND, `User is not registered`, "UserController");
      }

      const validPassword = bcrypt.compareSync(password, user!.password);
      if (!validPassword) {
         throw new HttpError(StatusCodes.NOT_FOUND, "Password is not valid", "UserController");
      }
      const tokenPayload: JwtTokenPayload = { userId: user._id.toString() };
      const token = this.generateToken(tokenPayload);
      return { user, token };
   }

   async getAllUsers(): Promise<Pick<User, "username" | "rooms" | "email">[]> {
      const users = await UserModel.find({}).select("username rooms email");
      return users;
   }

   async getUser(userId: Types.ObjectId) {
      const user = await UserModel.findById(userId).select("email username");
      if (!user) {
         throw new HttpError(StatusCodes.NOT_FOUND, "User not found");
      }
      return user;
   }

   async updateUserProfile(
      _id: Types.ObjectId,
      reqUserId: Types.ObjectId,
      params: UpdateUserParams
   ) {
      const user = await UserModel.findById(_id);
      if (!user) {
         throw new HttpError(StatusCodes.NOT_FOUND, "User is not found", "UserController");
      }

      this.checkOwnership(_id, reqUserId);

      let { username, password } = params;

      if (username) {
         const existingUser = await UserModel.findOne({ username });
         if (existingUser && !existingUser._id.equals(user._id)) {
            throw new HttpError(StatusCodes.CONFLICT, `Username ${username} already exists for another user`, "UserController");
         }
      }

      if (password) {
         const hashPassword = await bcrypt.hash(password, 7);
         params.password = hashPassword;
      }

      const updatedUser = await UserModel.findByIdAndUpdate(
         _id,
         params,
         { new: true }
      );

      return updatedUser;
   }

   async deleteUserProfile(
      _id: Types.ObjectId,
      reqUserId: Types.ObjectId
   ) {
      const user = await UserModel.findById(_id);
      if (!user) {
         throw new HttpError(StatusCodes.NOT_FOUND, "User is not found", "UserController");
      }
      this.checkOwnership(_id, reqUserId);

      await ChatRoomModel.deleteMany({ owner: user });

      return await UserModel.findByIdAndDelete(_id)
   }
}

export const userService = new UserService();
