import bycrptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/database/db";
import { HTTP_ERROR_CODES } from "@/enums/enum";
// import { sendEmail } from "@/helpers/Email/sendEmail";
import { ErrorType } from "@/types/ErrorType";
export const POST = async (request: NextRequest) => {
    const reqBody = await request.json();
    const { token, password } = reqBody;
    if (!token || !password) {
        return NextResponse.json({ message: "Token and password body params is required" }, { status: HTTP_ERROR_CODES.UNAUTHORIZED });
    }
    try {
        const user = await prisma.user.findFirst({
            where: {
                forgotPasswordToken: token,
            },
        });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: HTTP_ERROR_CODES.NOT_FOUND });
        }
        if (user.isverified === false) {
            return NextResponse.json({ message: "User is not verified" }, { status: HTTP_ERROR_CODES.UNAUTHORIZED });
        }
        if (user.forgotPasswordTokenExpiry && user.forgotPasswordTokenExpiry < new Date()) {
            return NextResponse.json({ message: "Token is expired" }, { status: HTTP_ERROR_CODES.BAD_REQUEST });
        }
        if (user.forgotPasswordToken !== token) {
            return NextResponse.json({ message: "Invalid token" }, { status: HTTP_ERROR_CODES.UNAUTHORIZED });
        }
        if (password.length < 6) {
            return NextResponse.json({ message: "Password should be atleast 6 characters long" }, { status: HTTP_ERROR_CODES.UNAUTHORIZED });
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
        // await sendEmail({ email: user.email, emailType: "PASSWORD_RESET_SUCCESS" });
        return NextResponse.json({ message: "Forgot password token created successfully" }, { status: HTTP_ERROR_CODES.OK });
    } catch (error) {
        console.log(error);
        const ErrorMsg = error as ErrorType;
        return NextResponse.json({ message: ErrorMsg.message || "Internal server error" }, { status: 500 });
    }
};
