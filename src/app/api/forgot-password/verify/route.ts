import bycrptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/database/db";
import { HTTP_ERROR_CODES } from "@/enums/enum";
import { sendEmail } from "@/helpers/Email/sendEmail";
import { ErrorType } from "@/types/ErrorType";
export const POST = async (request: NextRequest) => {
    const reqBody = await request.json();
    const { token, password } = reqBody;
    try {
        const user = await prisma.user.findFirst({
            where: {
                forgotPasswordToken: token,
            },
        });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: HTTP_ERROR_CODES.NOT_FOUND });
        }
        if (user.forgotPasswordToken !== token) {
            return NextResponse.json({ message: "Invalid token" }, { status: HTTP_ERROR_CODES.UNAUTHORIZED });
        }
        const newPassword = await bycrptjs.hash(password, 10);
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                password: newPassword,
                forgotPasswordToken: null,
                forgotPasswordTokenExpiry: null,
            },
        });
        await sendEmail({ email: user.email, emailType: "PASSWORD_RESET_SUCCESS" });
        return NextResponse.json({ message: "Forgot password token created successfully" }, { status: HTTP_ERROR_CODES.OK });
    } catch (error) {
        console.log(error);
        const ErrorMsg = error as ErrorType;
        return NextResponse.json({ message: ErrorMsg.message || "Internal server error" }, { status: 500 });
    }
};