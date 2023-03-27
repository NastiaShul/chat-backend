import { Request, Response, NextFunction, Router } from "express";
import { Socket } from "socket.io";
import { HttpError } from "./errors/http.error";

export interface IExceptionFilter {
   catch(
      err: Error | HttpError,
      req: Request,
      res: Response,
      next: NextFunction
   ): void;
}

export interface IControllerRoute {
   path: string,
   method: keyof Pick<Router, "get" | "post" | "delete" | "patch" | "put">;
   handler: (req: Request, res: Response, next: NextFunction) => void;
   validators?: Validation;
   authRequired?: boolean;
   extractUserId?: boolean;
}

export interface IConfig {
   app: {
      port: number;
   };
   db: {
      port: number;
      host: string;
      dbName: string;
   }
};

export interface UpdateUserParams {
   username?: string;
   email?: string;
   password?: string;
}

export interface AuthenticatedRequest extends Request {
   user?: any;
   userId?: string;
}

export interface DecodedToken {
   userId: string;
}

export type JwtTokenPayload = { userId: string }

export type Validation = Record<string, any>;

export type WsHandler = (client: Socket, userId: string, payload: any) => Promise<Record<string, unknown> | void>