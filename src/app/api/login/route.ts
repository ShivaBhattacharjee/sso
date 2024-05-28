import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
// import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/database/db";
import { HTTP_ERROR_CODES } from "@/enums/enum";
import { env } from "@/env";
import { ErrorType } from "@/types/ErrorType";

export const POST = async (request: NextRequest) => {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const { searchParams } = new URL(request.url);
    const redirectUrl = searchParams.get("redirectUrl");
    try {
        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required" }, { status: HTTP_ERROR_CODES.BAD_REQUEST });
        }
        if (password.length < 6) {
            return NextResponse.json({ message: "Password must be at least 6 characters" }, { status: HTTP_ERROR_CODES.BAD_REQUEST });
        }
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: HTTP_ERROR_CODES.NOT_FOUND });
        }
        if (!user.isverified) {
            return NextResponse.json({ message: "User not verified" }, { status: HTTP_ERROR_CODES.UNAUTHORIZED });
        }
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ message: "Invalid password" }, { status: HTTP_ERROR_CODES.UNAUTHORIZED });
        }
        const tokenData = {
            id: user.id,
            email: user.email,
            username: user.username,
        };

        const token = jwt.sign(tokenData, env.JWT_TOKEN, { expiresIn: "2y" });
        const url = `${redirectUrl}?token=${token}`;
        return NextResponse.json({ message: "Login success", token: token, redirect: redirectUrl && url }, { status: HTTP_ERROR_CODES.OK });
    } catch (error) {
        const ErrorMsg = error as ErrorType;
        console.log(error);
        return NextResponse.json({ message: ErrorMsg.message || "Internal server error", log: JSON.stringify(error) }, { status: HTTP_ERROR_CODES.INTERNAL_SEVER_ERROR });
    }
};
