import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { ErrorType } from "@/types/ErrorType";

export function GET(request: NextRequest) {
    const cookieStore = cookies();
    const { searchParams } = new URL(request.url);
    const redirectUrl = searchParams.get("redirectUrl");
    try {
        // const response = NextResponse.json({
        //     message: "Logout Successful",
        //     success: true,
        // });
        if (redirectUrl) {
            // const response = NextResponse.json({ message: "Login success", token: token, redirectUrl: url }, { status: HTTP_ERROR_CODES.OK });
            const Nextresponse = NextResponse.json(redirectUrl);
            Nextresponse.cookies.delete("token");
            return Nextresponse;
        }
        const token = cookieStore.get("token");

        if (token === undefined || token === null) {
            return NextResponse.json(
                { error: "No token found", success: false },
                {
                    status: 400,
                },
            );
        } else {
            cookies().delete("token");
            return NextResponse.json(
                { message: "Logout Successful", success: true },
                {
                    status: 200,
                },
            );
        }

        // return response;
    } catch (error: unknown) {
        const Error = error as ErrorType;
        return NextResponse.json({ error: Error.message });
    }
}
