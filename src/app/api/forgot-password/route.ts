import bycrptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/database/db";
import { HTTP_ERROR_CODES } from "@/enums/enum";
import { isValidEmail } from "@/helpers/Email/EmailRegex";
// import { sendEmail } from "@/helpers/Email/sendEmail";
import { ErrorType } from "@/types/ErrorType";
export const POST = async (request: NextRequest) => {
    const reqBody = await request.json();
    const { email } = reqBody;
    if (!email) {
        return NextResponse.json({ message: "Email body params is required" }, { status: HTTP_ERROR_CODES.UNAUTHORIZED });
    }
    try {
        isValidEmail(email);
        const user = await prisma.user.findUnique({
            where: {
                email: email,
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
        const hashedforgotPasswordToken = await bycrptjs.hash(user.id.toString(), 10);
        const forgotPasswordTokenExpiry = Date.now() + 3 * 60 * 60 * 1000; // 3 hours
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                forgotPasswordToken: hashedforgotPasswordToken,
                forgotPasswordTokenExpiry: new Date(forgotPasswordTokenExpiry),
            },
        });
        // await sendEmail({ email: user.email, emailType: "FORGOT_PASSWORD", verifyLink: `${process.env.NEXT_PUBLIC_URL}/forgot-password/verify?token=${hashedforgotPasswordToken}` });
        return NextResponse.json({ message: `Email sent to ${email} please verify your identity to reset ` }, { status: HTTP_ERROR_CODES.OK });
    } catch (error) {
        console.log(error);
        const ErrorMsg = error as ErrorType;
        return NextResponse.json({ message: ErrorMsg.message || "Internal server error" }, { status: 500 });
    }
};
