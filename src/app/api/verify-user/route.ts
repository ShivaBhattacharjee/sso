import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/database/db";
import { HTTP_ERROR_CODES } from "@/enums/enum";
import { ErrorType } from "@/types/ErrorType";

export const POST = async (request: NextRequest) => {
    const reqBody = await request.json();
    const { token, id } = reqBody;
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        if (!user) {
            return NextResponse.json(
                {
                    message: "User not found",
                },
                {
                    status: HTTP_ERROR_CODES.NOT_FOUND,
                },
            );
        }
        if (user.verificationToken !== token) {
            return NextResponse.json(
                {
                    message: "Invalid token",
                },
                {
                    status: HTTP_ERROR_CODES.UNAUTHORIZED,
                },
            );
        }
        if (user.verificationTokenExpiry && user.verificationTokenExpiry < new Date()) {
            return NextResponse.json(
                {
                    message: "Token expired",
                },
                {
                    status: HTTP_ERROR_CODES.UNAUTHORIZED,
                },
            );
        }
        await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                isverified: true,
                verificationToken: null,
                verificationTokenExpiry: null,
            },
        });
        return NextResponse.json(
            {
                message: "User verified successfully",
            },
            {
                status: HTTP_ERROR_CODES.OK,
            },
        );
    } catch (error) {
        console.log(error);
        const ErrorMsg = error as ErrorType;
        return NextResponse.json(
            {
                message: ErrorMsg.message || "Internal server error",
            },
            {
                status: HTTP_ERROR_CODES.INTERNAL_SEVER_ERROR,
            },
        );
    }
};
