import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/database/db";
import { HTTP_ERROR_CODES } from "@/enums/enum";
import { isValidEmail } from "@/helpers/Email/EmailRegex";
import { sendEmail } from "@/helpers/Email/sendEmail";
import { ErrorType } from "@/types/ErrorType";

export const POST = async (request: NextRequest) => {
    const reqBody = await request.json();
    const { username, email, password, name } = reqBody;
    try {
        if (!username || !email || !password || !name) {
            return NextResponse.json({ message: "All fields are required" }, { status: HTTP_ERROR_CODES.BAD_REQUEST });
        }
        if (password.length < 6) {
            return NextResponse.json({ message: "Password must be at least 6 characters" }, { status: HTTP_ERROR_CODES.BAD_REQUEST });
        }

        const emailValidity = isValidEmail(email);

        if (!emailValidity) {
            return NextResponse.json({ message: "Invalid email regex", emailValidity }, { status: HTTP_ERROR_CODES.BAD_REQUEST });
        }
        const existingUser = await prisma.user.findUnique({ where: { email: email } });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: HTTP_ERROR_CODES.CONFLICT });
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const user = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword,
                name: name,
            },
        });
        const userId = user.id;
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        const verifyTokenExpiry = Date.now() + 3 * 60 * 60 * 1000; // 3 hours
        user.verificationToken = hashedToken;
        user.verificationTokenExpiry = new Date(verifyTokenExpiry);
        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                verificationToken: hashedToken,
                verificationTokenExpiry: new Date(verifyTokenExpiry),
            },
        });

        await sendEmail({ email: user.email, emailType: "REGISTER", verifyLink: `${process.env.NEXT_PUBLIC_URL}/verify?token=${hashedToken}` });

        return NextResponse.json({ message: "User created successfully" }, { status: HTTP_ERROR_CODES.OK });
    } catch (error) {
        console.log(error);
        const ErrorMsg = error as ErrorType;
        return NextResponse.json({ message: ErrorMsg.message || "Internal server error", log: JSON.stringify(error) }, { status: HTTP_ERROR_CODES.INTERNAL_SEVER_ERROR });
    }
};
