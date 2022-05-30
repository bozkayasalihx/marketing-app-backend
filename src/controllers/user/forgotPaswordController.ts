import { Request, Response } from "express";
import httpStatus from "http-status";
import { sign } from "jsonwebtoken";
import eventclass from "../../loaders/eventEmitter";
import { generateForgotPasswordHTML } from "../../scripts/utils/generateForgotPasswordHtml";
import userOperation from "../../services/userOperation";

export const resetPasswordController = async (
    req: Request<any, any, { email: string }>,
    res: Response
) => {
    const { email } = req.body;
    try {
        const user = await userOperation.repo.findOne({ where: { email } });

        if (!user) {
            return res.status(httpStatus.OK).json({
                message: "true",
            });
        }

        const token = sign(
            { userId: user.id },
            process.env.FORGOT_PASSWORD_SECRET_KEY,
            {
                expiresIn: "1d",
            }
        );
        const html = generateForgotPasswordHTML({ token });
        eventclass.emit("send_email", {
            toEmail: email,
            html,
            subject: "Password Reset",
        });

        return res.status(httpStatus.OK).json({
            message: "operation succesful",
        });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "an error accured try again later",
            data: JSON.stringify(err),
        });
    }
};

export default resetPasswordController;
