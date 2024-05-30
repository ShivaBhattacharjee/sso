import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/database/db";
import { HTTP_ERROR_CODES } from "@/enums/enum";
import { ErrorType } from "@/types/ErrorType";

export const GET = async (request: NextRequest) => {
    try {
        const { searchParams } = new URL(request.url);
        const username = searchParams.get("username");
        if (!username) {
            return NextResponse.json(
                { message: "User id is required" },
                {
                    status: HTTP_ERROR_CODES.BAD_REQUEST,
                },
            );
        }
        const user = await prisma.user.findUnique({
            where: { username: username },
            select: {
                id: true,
                username: true,
                email: true,
                isverified: true,
            },
        });
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                {
                    status: HTTP_ERROR_CODES.NOT_FOUND,
                },
            );
        }
        return NextResponse.json(
            { message: "User found", user },
            {
                status: HTTP_ERROR_CODES.OK,
            },
        );
    } catch (e) {
        const ErrorMsg = e as ErrorType;
        return NextResponse.json(
            { message: ErrorMsg.message || "Internal server error" },
            {
                status: HTTP_ERROR_CODES.INTERNAL_SEVER_ERROR,
            },
        );
    }
};
