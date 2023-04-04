import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { HttpError } from "../common/errors/http.error";
import { UserModel } from "../models/user.model";

export class MailService {

   async sendEmail(email: string, newPassword: string): Promise<void> {
      try {
         const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service: 'Gmail',
            port: 587,
            secure: true,
            auth: {
               user: process.env.EMAIL_USER!,
               pass: process.env.EMAIL_PASS!,
            },
         });

         await transporter.sendMail({
            from: process.env.USER!,
            to: email,
            subject: "Reset password on GEEKCHAT",
            text: "",
            html:
               `<div style="padding: 15px; background-color: #F3EFE9; color: #171B18;">
                  <p style="text-align: center; margin: 10px 0 70px 0; font-size: 20px;">New password: <span
                     style=" font-size: 24px; font-weight: bold; color: #0daa6e;">${newPassword}</span></p>
                  <ol>
                     <p style="color: #BF002E; text-decoration: underline;">Please, don't forget update password in your profile:
                     </p>
                     <li>Log in to your profile with new password</li>
                     <li>Go to the profile settings.</li>
                     <li>Update this password with the new one.</li>
                  </ol>
               </div>`
         });

         console.log("Email sent successfully");
      }
      catch (error) {
         console.log(error, "Email not sent");
      }
   };

   async changePassword(email: string, newPassword: string) {
      const user = await UserModel.findOne({ email });
      if (!user) {
         throw new HttpError(StatusCodes.NOT_FOUND, "User with this email not register in system", "userController");
      }
      const hashedPassword = await bcrypt.hash(newPassword, 7);
      user.password = hashedPassword;
      const result = await user.save();

      return result;
   }
}

export const mailService = new MailService()